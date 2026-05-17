const express = require("express");
const authMiddleware = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/role.middleware");
const { USER_ROLES } = require("../auth/auth.constants");

const {
  getRecipientDashboard,
  getRecipientProfile,
} = require("./recipient.controller");

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  authorizeRoles(USER_ROLES.SEEKER, USER_ROLES.DONOR, USER_ROLES.ADMIN),
  getRecipientProfile,
);

router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles(USER_ROLES.SEEKER, USER_ROLES.DONOR, USER_ROLES.ADMIN),
  getRecipientDashboard,
);

module.exports = router;
