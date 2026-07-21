// ============================================
// config/db.js — MongoDB Atlas Connection
// ============================================
// Establishes a connection to MongoDB Atlas using Mongoose.
// Reads the URI from environment variables so credentials
// are never hardcoded. Gracefully handles connection failures.
// ============================================

const mongoose = require("mongoose");

/**
 * connectDB
 * Connects to MongoDB Atlas using the MONGO_URI environment variable.
 * Logs a success message on connection and exits the process
 * gracefully if the connection fails.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected Successfully — Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
