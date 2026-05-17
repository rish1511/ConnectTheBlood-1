const asyncHandler = require("../../utils/asyncHandler");
const apiResponse = require("../../utils/apiResponse");

const {
  getDonorProfileService,
  updateDonorProfileService,
  updateAvailabilityService,
  getDonorDashboardService,
  getEmergencyRequestService,
  acceptEmergencyRequestService,
  getDonationHistoryService,
} = require("./donor.service");

const getDonorProfile = asyncHandler(async (req, res) => {
  const donor = await getDonorProfileService(req.user.id);

  return apiResponse(res, 200, "Donor profile fetched successfully", donor);
});

const updateDonorProfile = asyncHandler(async (req, res) => {
  const updatedDonor = await updateDonorProfileService(req.user.id, req.body);

  return apiResponse(
    res,
    200,
    "Donor profile updated successfully",
    updatedDonor,
  );
});

const updateAvailability = asyncHandler(async (req, res) => {
  const { available } = req.body;

  const donor = await updateAvailabilityService(req.user.id, available);

  return apiResponse(res, 200, "Availability updated successfully", donor);
});

const getDonorDashboard = asyncHandler(async (req, res) => {
  const dashboardData = await getDonorDashboardService(req.user.id);

  return apiResponse(
    res,
    200,
    "Dashboard data fetched successfully",
    dashboardData,
  );
});

const getEmergencyRequests = asyncHandler(async (req, res) => {
  const requests = await getEmergencyRequestService(req.user.id);

  return apiResponse(
    res,
    200,
    "Emergency requests fetched successfully",
    requests,
  );
});

const acceptEmergencyRequest = asyncHandler(async (req, res) => {
  const request = await acceptEmergencyRequestService(
    req.user.id,
    req.params.id,
  );

  return apiResponse(
    res,
    200,
    "Emergency request accepted successfully",
    request,
  );
});

const getDonationHistory = asyncHandler(async (req, res) => {
  const donations = await getDonationHistoryService(req.user.id);

  return apiResponse(
    res,
    200,
    "Donation history fetched successfully",
    donations,
  );
});

module.exports = {
  getDonorProfile,
  updateDonorProfile,
  updateAvailability,
  getDonorDashboard,
  getEmergencyRequests,
  acceptEmergencyRequest,
  getDonationHistory,
};
