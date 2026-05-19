const asyncHandler = require("../../utils/asyncHandler");
const apiResponse = require("../../utils/apiResponse");
const ApiError = require("../../utils/apiError");
const {
  getMyNotificationsService,
  markNotificationReadService,
  markAllNotificationsReadService,
} = require("./notification.service");

const getMyNotifications = asyncHandler(async (req, res) => {
  const result = await getMyNotificationsService(req.user.id);
  return apiResponse(res, 200, "Notifications fetched successfully", result);
});

const markNotificationRead = asyncHandler(async (req, res) => {
  const updated = await markNotificationReadService(req.user.id, req.params.id);

  if (!updated) {
    throw new ApiError(404, "Notification not found");
  }

  return apiResponse(res, 200, "Notification marked as read", updated);
});

const markAllNotificationsRead = asyncHandler(async (req, res) => {
  await markAllNotificationsReadService(req.user.id);
  return apiResponse(res, 200, "All notifications marked as read", true);
});

module.exports = {
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
};
