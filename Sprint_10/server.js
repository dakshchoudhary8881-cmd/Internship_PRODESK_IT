// ============================================
// server.js — Application Entry Point
// ============================================
// Loads environment variables, connects to MongoDB Atlas,
// and starts the Express HTTP server. Separating server.js
// from app.js makes the app testable and Vercel-compatible.
// ============================================

const dotenv = require("dotenv");

// Load environment variables BEFORE importing app
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

// ============================================
// Configuration
// ============================================
const PORT = process.env.PORT || 5000;

// ============================================
// Start Server
// ============================================
const startServer = async () => {
  // Connect to MongoDB Atlas
  await connectDB();

  // Start listening for HTTP requests
  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`);
  });
};

startServer();

// ============================================
// Handle unhandled promise rejections globally
// ============================================
process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  process.exit(1);
});

// ============================================
// Export for Vercel serverless deployment
// ============================================
module.exports = app;
