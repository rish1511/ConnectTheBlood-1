const express = require("express");
const { registerController, loginController } = require("./auth.controller");
const { registerSchema, loginSchema } = require("./auth.validation");
const { loginLimiter, registerLimiter } = require("../../config/rate-limiter");
const validationMiddleware = require("../../middleware/validation.middleware");
const authMiddleware = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/role.middleware");
const router = express.Router();

router.post(
  "/register",
  registerLimiter,
  validationMiddleware(registerSchema),
  registerController,
);

router.post(
  "/login",
  loginLimiter,
  validationMiddleware(loginSchema),
  loginController,
);

router.get("/test-error", (req, res) => {
  throw new Error("Testing Error Middleware");
});

// protected route
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// admin only route
router.get("/admin", authMiddleware, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
});

module.exports = router;
