const mongoose = require("mongoose");

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
