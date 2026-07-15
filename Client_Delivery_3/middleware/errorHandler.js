const errorHandler = (err, req, res, _next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Malformed JSON in request body",
      errors: [],
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
  });
};

module.exports = errorHandler;
