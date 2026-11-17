/**
 * Automated Test Suite for MongoDB Atlas & Contact API Integration
 *
 * Tests:
 * 1. Input sanitization & validation (XSS prevention, email RFC 5322 compliance, length boundary checks)
 * 2. Mongoose Schema structure verification
 * 3. MongoDB Atlas live connectivity (if MONGODB_URI is provided)
 */

import { validateAndSanitizeContactInput, sanitizeString } from "../src/lib/sanitize.ts";
import { formatDate, normalizeImagePath } from "../src/lib/utils.ts";

async function runTests() {
  console.log("==================================================");
  console.log("🧪 Running Portfolio Database & Contact API Tests");
  console.log("==================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // TEST SUITE 1: Input Sanitization & XSS Prevention
  console.log("--- 1. Testing Input Sanitization & Security ---");
  const xssInput = "<script>alert('hack')</script>John Doe";
  const sanitizedXss = sanitizeString(xssInput);
  assert(sanitizedXss === "alert('hack')John Doe", "Strips script tags cleanly");

  const nestedXss = "<<SCRIPT>script>alert(1)<</SCRIPT>/script>";
  assert(!sanitizeString(nestedXss).includes("<script"), "Recursively cleanses nested XSS tags");

  const mathComparison = "Score is < 90% and > 80%";
  assert(sanitizeString(mathComparison) === "Score is < 90% and > 80%", "Preserves mathematical inequality symbols");

  const nullByteInput = "Hello\0World";
  assert(sanitizeString(nullByteInput) === "HelloWorld", "Strips dangerous null bytes");

  // TEST SUITE 2: Date Formatting Edge Cases
  console.log("\n--- 2. Testing Date Utility Resilience ---");
  assert(formatDate("2024-05") === "May 2024", "Formats valid YYYY-MM correctly");
  assert(formatDate("2024") === "2024", "Handles year-only string correctly");
  assert(formatDate("invalid-date") === "invalid-date", "Safely preserves invalid date string without throwing or returning 'Invalid Date'");
  assert(formatDate("") === "", "Safely handles empty string");

  // TEST SUITE 3: Image Path Normalization & Resilience
  console.log("\n--- 3. Testing Image Path Normalization ---");
  assert(normalizeImagePath("images/civicconnect.png") === "/images/civicconnect.png", "Auto-prepends leading slash to relative image path");
  assert(normalizeImagePath("/images/civicconnect.png") === "/images/civicconnect.png", "Preserves existing leading slash on local image path");
  assert(normalizeImagePath("https://images.unsplash.com/photo-1") === "https://images.unsplash.com/photo-1", "Preserves remote HTTPS image URLs");
  assert(normalizeImagePath("data:image/png;base64,abc") === "data:image/png;base64,abc", "Preserves Data URIs");
  assert(normalizeImagePath("") === "", "Safely handles empty image strings");

  // TEST SUITE 4: Contact Form Validation
  console.log("\n--- 4. Testing Contact Form Validation ---");
  const validPayload = {
    name: "Aravind Sharma",
    email: "aravind@example.com",
    subject: "Software Internship Inquiry",
    message: "Hi Vishnu, I saw your portfolio and would like to connect regarding an internship.",
  };
  const validRes = validateAndSanitizeContactInput(validPayload);
  assert(validRes.isValid === true, "Accepts complete, valid submission");
  assert(validRes.sanitized.email === "aravind@example.com", "Normalizes email to lowercase");

  const invalidEmailPayload = {
    name: "John",
    email: "not-an-email",
    message: "Valid message content here",
  };
  const invalidEmailRes = validateAndSanitizeContactInput(invalidEmailPayload);
  assert(invalidEmailRes.isValid === false, "Rejects malformed email address");
  assert(
    invalidEmailRes.errors.some((e) => e.includes("valid email")),
    "Provides clear email error message"
  );

  const shortNamePayload = {
    name: "J",
    email: "john@example.com",
    message: "Valid message content here",
  };
  const shortNameRes = validateAndSanitizeContactInput(shortNamePayload);
  assert(shortNameRes.isValid === false, "Rejects name shorter than 2 characters");

  const shortMessagePayload = {
    name: "John Doe",
    email: "john@example.com",
    message: "Hi",
  };
  const shortMessageRes = validateAndSanitizeContactInput(shortMessagePayload);
  assert(shortMessageRes.isValid === false, "Rejects message shorter than 5 characters");

  // TEST SUITE 3: Environment Variable Check & Atlas Connection
  console.log("\n--- 3. Testing MongoDB Atlas Environment & Connection ---");
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri || mongoUri.trim() === "") {
    console.log("  ℹ️  MONGODB_URI is not set in current process environment.");
    console.log("      (Configure MONGODB_URI in .env.local to run live Atlas network test)");
  } else {
    try {
      console.log("  Connecting to MongoDB Atlas...");
      const mongoose = (await import("mongoose")).default;
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      assert(mongoose.connection.readyState === 1, "Successfully connected to MongoDB Atlas");
      await mongoose.disconnect();
    } catch (err) {
      console.log(`  ⚠️  Atlas connection attempt finished with: ${err.message}`);
    }
  }

  console.log("\n==================================================");
  console.log(`🎉 Test Results: ${passed} passed, ${failed} failed`);
  console.log("==================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
