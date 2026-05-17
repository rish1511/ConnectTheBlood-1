const asyncHandler = require("../../utils/asyncHandler");
const apiResponse = require("../../utils/apiResponse");

const {
  createRequestService,
  getMyRequestsService,
  getRequestsService,
  updateRequestStatusService,
} = require("./request.service");

const createRequest = asyncHandler(async (req, res) => {
  const request = await createRequestService(req.user.id, req.body);

  return apiResponse(res, 201, "Request created successfully", request);
});

const getMyRequests = asyncHandler(async (req, res) => {
  const requests = await getMyRequestsService(req.user.id);

  return apiResponse(res, 200, "Requests fetched successfully", requests);
});

const getRequests = asyncHandler(async (req, res) => {
  const requests = await getRequestsService(req.query);

  return apiResponse(res, 200, "Requests fetched successfully", requests);
});

const updateRequestStatus = asyncHandler(async (req, res) => {
  const request = await updateRequestStatusService(
    req.params.id,
    req.body.status,
  );

  return apiResponse(res, 200, "Request status updated successfully", request);
});

module.exports = {
  createRequest,
  getMyRequests,
  getRequests,
  updateRequestStatus,
};
