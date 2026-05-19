const asyncHandler = require("../../utils/asyncHandler");
const apiResponse = require("../../utils/apiResponse");
const {
  getAdminDashboardService,
  updateAdminUserRoleService,
  updateAdminUserStatusService,
  updateAdminRequestStatusService,
} = require("./admin.service");

const getAdminDashboard = asyncHandler(async (req, res) => {
  const dashboard = await getAdminDashboardService();

  return apiResponse(res, 200, "Admin dashboard fetched successfully", dashboard);
});

const updateAdminUserStatus = asyncHandler(async (req, res) => {
  const user = await updateAdminUserStatusService(req.params.id, req.body);

  return apiResponse(res, 200, "User status updated successfully", user);
});

const updateAdminUserRole = asyncHandler(async (req, res) => {
  const user = await updateAdminUserRoleService(req.params.id, req.body);

  return apiResponse(res, 200, "User role updated successfully", user);
});

const updateAdminRequestStatus = asyncHandler(async (req, res) => {
  const request = await updateAdminRequestStatusService(req.params.id, req.body);

  return apiResponse(res, 200, "Request status updated successfully", request);
});

module.exports = {
  getAdminDashboard,
  updateAdminUserStatus,
  updateAdminUserRole,
  updateAdminRequestStatus,
};
