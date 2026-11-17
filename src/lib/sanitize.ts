/**
 * Input sanitization and validation utilities for server-side handlers
 */

// Strip HTML tags and dangerous characters to prevent stored XSS attacks
// while safely preserving legitimate mathematical / comparison expressions (e.g. "< 90% and > 80%")
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") {
    return "";
  }

  let sanitized = input
    .trim()
    // Remove null bytes
    .replace(/\0/g, "");

  // Match HTML tags (e.g. <script>, </div >, <img src=... />, <!-- comments -->)
  // Tags begin with < followed by an optional / and an ASCII letter
  const htmlTagPattern = /<(?:\/?[a-zA-Z][a-zA-Z0-9]*\b[^>]*|\/|!--[\s\S]*?--)>/gi;

  // Run recursive loop to prevent nested-tag injection (e.g. <<script>script>)
  let previous = "";
  while (previous !== sanitized) {
    previous = sanitized;
    sanitized = sanitized.replace(htmlTagPattern, "");
  }

  return sanitized
    // Normalize excessive newlines/whitespace
    .replace(/(\r\n|\n|\r){3,}/g, "\n\n")
    .trim();
}

// RFC 5322 compliant email regex
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitized: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

export function validateAndSanitizeContactInput(body: unknown): ValidationResult {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return {
      isValid: false,
      errors: ["Invalid request body format."],
      sanitized: { name: "", email: "", subject: "", message: "" },
    };
  }

  const payload = body as Record<string, unknown>;

  // 1. Name validation & sanitization
  const rawName = sanitizeString(payload.name);
  if (!rawName || rawName.length < 2) {
    errors.push("Please provide a valid name (at least 2 characters).");
  } else if (rawName.length > 100) {
    errors.push("Name cannot exceed 100 characters.");
  }

  // 2. Email validation & sanitization
  const rawEmail = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!rawEmail || !EMAIL_REGEX.test(rawEmail)) {
    errors.push("Please provide a valid email address (e.g., name@example.com).");
  } else if (rawEmail.length > 254) {
    errors.push("Email address is too long.");
  }

  // 3. Subject sanitization (optional)
  let rawSubject = sanitizeString(payload.subject);
  if (!rawSubject || rawSubject.length < 2) {
    rawSubject = `Portfolio Contact from ${rawName || "Visitor"}`;
  } else if (rawSubject.length > 200) {
    rawSubject = rawSubject.substring(0, 200);
  }

  // 4. Message validation & sanitization
  const rawMessage = sanitizeString(payload.message);
  if (!rawMessage || rawMessage.length < 5) {
    errors.push("Message must be at least 5 characters long.");
  } else if (rawMessage.length > 5000) {
    errors.push("Message cannot exceed 5000 characters.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      name: rawName,
      email: rawEmail,
      subject: rawSubject,
      message: rawMessage,
    },
  };
}
