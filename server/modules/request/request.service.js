const Request = require("./request.model");
const ApiError = require("../../utils/apiError");

const createRequestService = async (userId, payload) => {
  return Request.create({
    ...payload,
    createdBy: userId,
  });
};

const getMyRequestsService = async (userId) => {
  return Request.find({
    createdBy: userId,
  }).sort({
    createdAt: -1,
  });
};

const getRequestsService = async (filters = {}) => {
  const query = {};

  if (filters.bloodGroup) {
    query.bloodGroup = filters.bloodGroup;
  }

  if (filters.city) {
    query.city = filters.city;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  return Request.find(query)
    .populate("createdBy", "fullName phone city")
    .populate("acceptedBy", "fullName phone bloodGroup city")
    .sort({
      createdAt: -1,
    });
};

const updateRequestStatusService = async (requestId, status) => {
  const request = await Request.findByIdAndUpdate(
    requestId,
    { status },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  return request;
};

module.exports = {
  createRequestService,
  getMyRequestsService,
  getRequestsService,
  updateRequestStatusService,
};
