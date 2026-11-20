import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";
import { validateAndSanitizeContactInput } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

// In-memory sliding window rate limiter (max 5 requests per 10 minutes per IP)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestHistory = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipRequestHistory.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestHistory.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  ipRequestHistory.set(ip, timestamps);

  // Periodic cleanup if map grows
  if (ipRequestHistory.size > 1000) {
    for (const [key, times] of ipRequestHistory.entries()) {
      const active = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) {
        ipRequestHistory.delete(key);
      } else {
        ipRequestHistory.set(key, active);
      }
    }
  }

  return false;
}

/**
 * POST /api/contact
 * Handles contact form submissions, validates/sanitizes inputs,
 * and persists the message to MongoDB Atlas.
 */
export async function POST(request: Request) {
  try {
    // Extract client metadata for rate limiting & security auditing
    const headers = request.headers;
    const forwardedFor = headers.get("x-forwarded-for");
    const ipAddress = forwardedFor
      ? forwardedFor.split(",")[0].trim().substring(0, 45)
      : headers.get("x-real-ip")?.substring(0, 45) || "127.0.0.1";
    const userAgent = headers.get("user-agent")?.substring(0, 500) || undefined;

    // Rate Limiting Check
    if (isRateLimited(ipAddress)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many messages sent from this connection. Please wait a few minutes before submitting again.",
        },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload in request." },
        { status: 400 }
      );
    }

    // 0. Honeypot & bot detection check
    if (body && typeof body === "object") {
      const payloadObj = body as Record<string, unknown>;

      // Honeypot trap: if website field is populated, silently acknowledge without db storage
      if (typeof payloadObj.website === "string" && payloadObj.website.trim().length > 0) {
        console.warn(`[Contact API] Honeypot triggered from IP: ${ipAddress}`);
        return NextResponse.json(
          {
            success: true,
            message: "Thank you! Your message has been received.",
          },
          { status: 200 }
        );
      }

      // Timing check: flag automated bot submissions faster than 1200ms
      if (typeof payloadObj._elapsed === "number" && payloadObj._elapsed < 1200) {
        return NextResponse.json(
          {
            success: false,
            error: "Form was submitted abnormally fast. Please review your message.",
          },
          { status: 400 }
        );
      }
    }

    // 1. Validate and sanitize all incoming fields
    const { isValid, errors, sanitized } = validateAndSanitizeContactInput(body);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: errors[0] || "Invalid submission data.",
          allErrors: errors,
        },
        { status: 400 }
      );
    }

    // 3. Connect to MongoDB Atlas if configured, or gracefully log in fallback mode
    let savedToDatabase = false;
    let savedId: string | undefined = undefined;

    if (process.env.MONGODB_URI && process.env.MONGODB_URI.trim() !== "") {
      try {
        await connectToDatabase();
        const newContact = await ContactMessage.create({
          name: sanitized.name,
          email: sanitized.email,
          subject: sanitized.subject,
          message: sanitized.message,
          status: "unread",
          ipAddress,
          userAgent,
        });
        savedToDatabase = true;
        savedId = newContact._id.toString();
        console.log(
          `[Contact API] Message #${newContact._id} saved to MongoDB from ${sanitized.email}`
        );
      } catch (dbError) {
        console.warn(
          "[Contact API] Database connection failed, falling back to server log:",
          dbError
        );
      }
    } else {
      console.log(
        `[Contact API] MONGODB_URI not set. Message recorded in server runtime logs from ${sanitized.name} (${sanitized.email}):`,
        sanitized.message
      );
    }

    // 4. Dispatch Email Notification if email provider key is configured
    let emailDispatched = false;
    const recipientEmail = process.env.NOTIFICATION_EMAIL || "vishnuvenkatraj@gmail.com";

    // Option A: Resend API support (zero npm dependency, native HTTP POST)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [recipientEmail],
            reply_to: sanitized.email,
            subject: `[Portfolio Inquiry] ${sanitized.subject} - from ${sanitized.name}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #0284c7; margin-bottom: 16px;">New Message from Developer Portfolio</h2>
                <p><strong>Sender:</strong> ${sanitized.name} (${sanitized.email})</p>
                <p><strong>Subject:</strong> ${sanitized.subject}</p>
                <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                <h3 style="color: #334155;">Message Content:</h3>
                <div style="background: #f8fafc; padding: 16px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #1e293b;">
                  ${sanitized.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                </div>
              </div>
            `,
          }),
        });
        if (resendRes.ok) {
          emailDispatched = true;
          console.log(`[Contact API] Email notification dispatched via Resend to ${recipientEmail}`);
        }
      } catch (emailErr) {
        console.warn("[Contact API] Resend email dispatch failed:", emailErr);
      }
    }

    // Option B: Web3Forms API support (free key)
    if (!emailDispatched && process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name: sanitized.name,
            email: sanitized.email,
            subject: `[Portfolio Inquiry] ${sanitized.subject}`,
            message: sanitized.message,
            from_name: "Vishnu Portfolio Contact Form",
          }),
        });
        if (web3Res.ok) {
          emailDispatched = true;
          console.log(`[Contact API] Email notification dispatched via Web3Forms to ${recipientEmail}`);
        }
      } catch (w3Err) {
        console.warn("[Contact API] Web3Forms email dispatch failed:", w3Err);
      }
    }

    // Option C: Generic Webhook (Discord / Slack / Telegram) support
    if (process.env.NOTIFICATION_WEBHOOK_URL) {
      try {
        await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `**New Portfolio Message!**\n**From:** ${sanitized.name} (${sanitized.email})\n**Subject:** ${sanitized.subject}\n**Message:**\n${sanitized.message}`,
          }),
        });
      } catch (webhookErr) {
        console.warn("[Contact API] Webhook dispatch failed:", webhookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your message has been received. I will review and reply to your inquiry shortly.",
        savedToDatabase,
        emailDispatched,
        id: savedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Unexpected error handling submission:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected internal error occurred while saving your message.",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Lightweight health check to test database connectivity without exposing secrets.
 */
export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          status: "fallback_mode",
          database: "not_configured",
          message:
            "MONGODB_URI is not set. Contact API is operating in graceful runtime logging fallback mode.",
        },
        { status: 200 }
      );
    }

    const mongooseInstance = await connectToDatabase();
    const isConnected = mongooseInstance.connection.readyState === 1;

    return NextResponse.json(
      {
        status: isConnected ? "healthy" : "connecting",
        database: isConnected ? "connected" : "disconnected",
        timestamp: new Date().toISOString(),
      },
      { status: isConnected ? 200 : 503 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
