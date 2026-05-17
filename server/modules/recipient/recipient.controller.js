const asyncHandler = require("../../utils/asyncHandler");
const apiResponse = require("../../utils/apiResponse");

const {
  getRecipientDashboardService,
  getRecipientProfileService,
} = require("./recipient.service");

const getRecipientProfile = asyncHandler(async (req, res) => {
  const recipient = await getRecipientProfileService(req.user.id);

  return apiResponse(res, 200, "Recipient profile fetched successfully", recipient);
});

const getRecipientDashboard = asyncHandler(async (req, res) => {
  const dashboard = await getRecipientDashboardService(req.user.id);

  return apiResponse(
    res,
    200,
    "Recipient dashboard fetched successfully",
    dashboard,
  );
});

module.exports = {
  getRecipientProfile,
  getRecipientDashboard,
};
