const express = require("express");

const {
  registerController,
  loginController,
} = require("./auth.controller");

const authMiddleware = require(
  "../../middleware/auth.middleware"
);

const authorizeRoles = require(
  "../../middleware/role.middleware"
);

const router = express.Router();

router.post(
  "/register",
  registerController
);

router.post(
  "/login",
  loginController
);

// protected route
router.get(
  "/me",
  authMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

// admin only route
router.get(
  "/admin",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "Welcome Admin",
    });
  }
);

module.exports = router;