// ============================================
// middleware/errorHandler.js — Centralized Error Handler
// ============================================
// Catches all errors forwarded by next(error) or thrown
// inside async handlers. Maps Mongoose-specific errors
// (CastError, ValidationError, duplicate key) to
// meaningful HTTP responses so the server never crashes.
// ============================================

/**
 * errorHandler
 * Express error-handling middleware (4 arguments).
 */
const errorHandler = (err, req, res, next) => {
  // Clone status and message from the incoming error
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // -------------------------------------------
  // Mongoose: Invalid ObjectId (CastError)
  // -------------------------------------------
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // -------------------------------------------
  // Mongoose: Validation Error
  // -------------------------------------------
  if (err.name === "ValidationError") {
    statusCode = 400;
    const messages = Object.values(err.errors).map((val) => val.message);
    message = messages.join(". ");
  }

  // -------------------------------------------
  // Mongoose: Duplicate Key (code 11000)
  // -------------------------------------------
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue).join(", ");
    message = `Duplicate value for field: ${field}. Please use a different value.`;
  }

  // Log in development for debugging
  if (process.env.NODE_ENV === "development") {
    console.error(`[ERROR] ${err.stack || err.message}`);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? (err.stack || message) : message,
  });
};

module.exports = errorHandler;
