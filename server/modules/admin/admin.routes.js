const express = require("express");
const authMiddleware = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/role.middleware");
const { USER_ROLES } = require("../auth/auth.constants");
const {
  getAdminDashboard,
  updateAdminRequestStatus,
  updateAdminUserRole,
  updateAdminUserStatus,
} = require("./admin.controller");

const router = express.Router();

router.use(authMiddleware, authorizeRoles(USER_ROLES.ADMIN));

router.get("/dashboard", getAdminDashboard);
router.patch("/users/:id/status", updateAdminUserStatus);
router.patch("/users/:id/role", updateAdminUserRole);
router.patch("/requests/:id/status", updateAdminRequestStatus);

module.exports = router;
