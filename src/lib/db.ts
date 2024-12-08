declare global {
  var mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}

import mongoose from "mongoose";

const Database_URl = process.env.DATABASE_URL;

if (!Database_URl) {
  throw new Error("Invalid Database URL");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  try {
    cached.promise = mongoose.connect(Database_URl, {
      bufferCommands: false,
    });
    cached.conn = await cached.promise;
    console.log("MongoDB Connected");
    return cached.conn;
  } catch (error) {
    console.error("Error connecting to the Database");
    throw error;
  }
};

export default connectDB;
