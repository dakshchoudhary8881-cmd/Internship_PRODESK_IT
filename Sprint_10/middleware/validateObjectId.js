// ============================================
// middleware/validateObjectId.js — MongoDB ObjectId Validator
// ============================================
// Express middleware that validates the :id route parameter.
// Returns a 400 response if the ID is not a valid MongoDB
// ObjectId, preventing Mongoose CastError at the DB layer.
// ============================================

const mongoose = require("mongoose");

/**
 * validateObjectId
 * Middleware to validate that req.params.id is a valid ObjectId.
 */
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid ID format: ${req.params.id}`,
    });
  }
  next();
};

module.exports = validateObjectId;
