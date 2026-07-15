const { body, validationResult } = require("express-validator");

const VALID_STATUSES = ["waiting", "playing", "completed"];

const createValidationRules = () => [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("Name must not exceed 50 characters")
    .custom((value) => {
      if (/^\d+$/.test(value)) {
        throw new Error("Name cannot contain only numbers");
      }
      return true;
    }),

  body("game")
    .exists({ checkFalsy: true })
    .withMessage("Game is required")
    .isString()
    .withMessage("Game must be a string")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Game must be at least 2 characters"),

  body("players")
    .exists({ checkNull: true })
    .withMessage("Players count is required")
    .isInt({ min: 1, max: 20 })
    .withMessage("Players must be an integer between 1 and 20"),

  body("phone")
    .exists({ checkFalsy: true })
    .withMessage("Phone number is required")
    .isString()
    .withMessage("Phone must be a string")
    .trim()
    .matches(/^\d{10}$/)
    .withMessage("Phone must be exactly 10 digits"),

  body("status")
    .optional()
    .isIn(VALID_STATUSES)
    .withMessage(`Status must be one of: ${VALID_STATUSES.join(", ")}`),
];

const updateValidationRules = () => [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("Name must not exceed 50 characters")
    .custom((value) => {
      if (/^\d+$/.test(value)) {
        throw new Error("Name cannot contain only numbers");
      }
      return true;
    }),

  body("game")
    .optional()
    .isString()
    .withMessage("Game must be a string")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Game must be at least 2 characters"),

  body("players")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Players must be an integer between 1 and 20"),

  body("phone")
    .optional()
    .isString()
    .withMessage("Phone must be a string")
    .trim()
    .matches(/^\d{10}$/)
    .withMessage("Phone must be exactly 10 digits"),

  body("status")
    .optional()
    .isIn(VALID_STATUSES)
    .withMessage(`Status must be one of: ${VALID_STATUSES.join(", ")}`),
];

const validate = (req, res, next) => {
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

  return next();
};

module.exports = { createValidationRules, updateValidationRules, validate };
