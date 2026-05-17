const { ZodError } = require("zod");

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Zod validation errors
  if (err instanceof ZodError) {
    statusCode = 400;
    const issues = err.issues || err.errors || [];
    message = issues.map((e) => e.message).join(", ");
  }

  // Mongoose validation error
  if (err.name === "ValidationError" && err.errors) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Mongoose cast error (invalid ObjectId etc.)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Duplicate key error
  if (err.code && err.code === 11000) {
    statusCode = 400;
    const fields = Object.keys(err.keyValue || {}).join(", ");
    message = `Duplicate field value: ${fields}`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

module.exports = errorMiddleware;
