// ============================================
// validators/postValidator.js — Post Request Validators
// ============================================
// Uses express-validator to define reusable validation
// chains for POST and PUT requests on the /api/posts route.
// A shared validationResult handler returns structured
// JSON errors if any validation rule fails.
// ============================================

const { body, validationResult } = require("express-validator");

// ============================================
// Shared: extract and format validation errors
// ============================================
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: extractedErrors,
    });
  }

  next();
};

// ============================================
// Validate: Create Post (POST /api/posts)
// ============================================
const validateCreatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters")
    .escape(),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .escape(),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .escape(),

  body("authorId")
    .trim()
    .notEmpty()
    .withMessage("Author ID is required")
    .isMongoId()
    .withMessage("Author ID must be a valid MongoDB ObjectId"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("image")
    .optional()
    .trim()
    .isURL()
    .withMessage("Image must be a valid URL"),

  body("likes")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Likes must be a non-negative integer"),

  handleValidationErrors,
];

// ============================================
// Validate: Update Post (PUT /api/posts/:id)
// ============================================
const validateUpdatePost = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty if provided")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters")
    .escape(),

  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty if provided")
    .escape(),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty if provided")
    .escape(),

  body("authorId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Author ID must be a valid MongoDB ObjectId"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("image")
    .optional()
    .trim()
    .isURL()
    .withMessage("Image must be a valid URL"),

  body("likes")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Likes must be a non-negative integer"),

  handleValidationErrors,
];

module.exports = {
  validateCreatePost,
  validateUpdatePost,
};
