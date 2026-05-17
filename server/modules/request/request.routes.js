const express = require("express");
const authMiddleware = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");
const { USER_ROLES } = require("../auth/auth.constants");

const router = express.Router();

const {
  createRequest,
  getMyRequests,
  getRequests,
  updateRequestStatus,
} = require("./request.controller");

const {
  createRequestSchema,
  updateRequestStatusSchema,
} = require("./request.validation");

router.post(
  "/",
  authMiddleware,
  authorizeRoles(USER_ROLES.SEEKER, USER_ROLES.ADMIN),
  validate(createRequestSchema),
  createRequest,
);

router.get(
  "/my",
  authMiddleware,
  authorizeRoles(USER_ROLES.SEEKER, USER_ROLES.ADMIN),
  getMyRequests,
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  getRequests,
);

router.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  validate(updateRequestStatusSchema),
  updateRequestStatus,
);

module.exports = router;
