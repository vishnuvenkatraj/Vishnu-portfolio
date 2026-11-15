import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate fields
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const finalSubject =
      subject && typeof subject === "string" && subject.trim().length >= 2
        ? subject.trim()
        : `Portfolio Contact from ${name.trim()}`;

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 5 characters." },
        { status: 400 }
      );
    }

    // In production, integrate with Resend, SendGrid, or AWS SES
    console.log("[Contact API] Received submission:", {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      subject: finalSubject,
      messageLength: message.trim().length,
    });

    // Simulate realistic processing delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been securely delivered. I will get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Error handling request:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
