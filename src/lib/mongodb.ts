import mongoose from "mongoose";

/**
 * MongoDB Atlas Connection Manager for Next.js Serverless & Node.js
 *
 * Implements connection caching across hot reloads in development and
 * preserves a single connection pool across serverless function invocations.
 */

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI || MONGODB_URI;

  if (!uri || uri.trim() === "") {
    throw new Error(
      "Database configuration missing: Please set MONGODB_URI in your .env.local file."
    );
  }

  // Return existing active connection if healthy
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  // If previous connection dropped or disconnected, reset cache so fresh connection is established
  if (cached.conn && cached.conn.connection.readyState !== 1) {
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 8000, // Timeout after 8s instead of hanging indefinitely
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log("[MongoDB Atlas] Successfully connected to database.");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("[MongoDB Atlas] Connection failed:", error);
    throw error;
  }

  return cached.conn;
}
