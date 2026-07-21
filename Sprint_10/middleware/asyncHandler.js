// ============================================
// middleware/asyncHandler.js — Async Error Wrapper
// ============================================
// Wraps async route handlers so that any rejected
// promise is automatically caught and forwarded to
// the Express error-handling middleware via next().
// Eliminates repetitive try/catch blocks.
// ============================================

/**
 * asyncHandler
 * @param {Function} fn — An async Express route handler
 * @returns {Function} — Wrapped handler that catches errors
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
