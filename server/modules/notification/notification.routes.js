const express = require("express");
const authMiddleware = require("../../middleware/auth.middleware");
const {
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} = require("./notification.controller");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getMyNotifications);
router.patch("/read-all", markAllNotificationsRead);
router.patch("/:id/read", markNotificationRead);

module.exports = router;
