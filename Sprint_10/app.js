// ============================================
// app.js — Express Application Configuration
// ============================================
// Sets up all middleware (security, logging, compression),
// mounts API routes, and configures error handling.
// This module exports the configured app instance
// without starting the HTTP server — that's done in server.js.
// ============================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Route imports
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const statsRoutes = require("./routes/statsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authorRoutes = require("./routes/authorRoutes");

// Middleware imports
const errorHandler = require("./middleware/errorHandler");

// Initialize Express app
const app = express();

// ============================================
// Security & Utility Middleware
// ============================================

// Set security-related HTTP headers
app.use(helmet());

// Enable CORS for all origins (customizable via env if needed)
app.use(cors());

// Compress all HTTP responses
app.use(compression());

// Parse incoming JSON payloads
app.use(express.json({ limit: "10mb" }));

// Parse URL-encoded payloads (form submissions)
app.use(express.urlencoded({ extended: true }));

// HTTP request logger (concise output in dev, combined in production)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ============================================
// Root — API Status
// ============================================
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "🚀 The Data Hub v2 API is running successfully!",
    version: "2.0.0",
    documentation: "/api",
  });
});

// ============================================
// API Index — Available Endpoints
// ============================================
app.get("/api", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to The Data Hub v2 API",
    endpoints: {
      posts: "/api/posts",
      users: "/api/users",
      stats: "/api/stats",
      categories: "/api/categories/top",
      authors: "/api/authors/top",
      health: "/api/health",
    },
  });
});

// ============================================
// Health Check — Server + Database Status (P3)
// ============================================
app.get("/api/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStates = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };

  const isDbHealthy = dbState === 1;

  return res.status(isDbHealthy ? 200 : 503).json({
    success: true,
    message: "Health check completed.",
    data: {
      server: "Running",
      database: dbStates[dbState] || "Unknown",
      uptime: `${Math.floor(process.uptime())}s`,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      dbHost: isDbHealthy ? mongoose.connection.host : null,
      dbName: isDbHealthy ? mongoose.connection.name : null,
    },
  });
});

// ============================================
// API Routes
// ============================================
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/authors", authorRoutes);

// ============================================
// 404 — Route Not Found
// ============================================
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// ============================================
// Centralized Error Handler (must be last)
// ============================================
app.use(errorHandler);

module.exports = app;
