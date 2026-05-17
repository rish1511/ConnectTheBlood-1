const express = require("express");
const {USER_ROLES} = require("../auth/auth.constants");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/role.middleware");

const {
  getDonorProfile,
  updateDonorProfile,
  updateAvailability,
  getDonorDashboard,
  getEmergencyRequests,
  acceptEmergencyRequest,
  getAcceptedRequests,
  completeEmergencyRequest,
  getDonationHistory,
} = require("./donor.controller");

const {
  updateProfileSchema,
  updateAvailabilitySchema,
} = require("./donor.validation");

const validate = require("../../middleware/validation.middleware");

// Profile
router.get(
  "/profile",
  authMiddleware,
  authorizeRoles("donor", "admin"),
  getDonorProfile,
);

// Update profile
router.patch(
  "/profile",
  authMiddleware,
  authorizeRoles("donor", "admin"),
  validate(updateProfileSchema),
  updateDonorProfile,
);

// Availability toggle
router.patch(
  "/availability",
  authMiddleware,
  authorizeRoles("donor"),
  validate(updateAvailabilitySchema),
  updateAvailability,
);

// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("donor", "admin"),
  getDonorDashboard,
);

router.get(
  "/emergency-requests",
  authMiddleware,
  authorizeRoles(
    USER_ROLES.DONOR
  ),
  getEmergencyRequests,
);

router.post(
  "/emergency-requests/:id/accept",
  authMiddleware,
  authorizeRoles(
    USER_ROLES.DONOR
  ),
  acceptEmergencyRequest,
);

router.get(
  "/accepted-requests",
  authMiddleware,
  authorizeRoles(
    USER_ROLES.DONOR
  ),
  getAcceptedRequests,
);

router.patch(
  "/emergency-requests/:id/complete",
  authMiddleware,
  authorizeRoles(
    USER_ROLES.DONOR
  ),
  completeEmergencyRequest,
);

router.get(
  "/donation-history",
  authMiddleware,
  authorizeRoles(
    USER_ROLES.DONOR
  ),
  getDonationHistory,
);

module.exports = router;
