const Request = require("./request.model");
const ApiError = require("../../utils/apiError");
const User = require("../auth/auth.model");
const { USER_ROLES } = require("../auth/auth.constants");
const {
  createNotification,
  createNotificationsForUsers,
} = require("../notification/notification.service");

const createRequestService = async (userId, payload) => {
  const request = await Request.create({
    ...payload,
    createdBy: userId,
  });

  const matchingDonors = await User.find({
    $or: [{ role: USER_ROLES.DONOR }, { roles: USER_ROLES.DONOR }],
    bloodGroup: request.bloodGroup,
    isBlocked: false,
  })
    .select("_id")
    .lean();

  await createNotificationsForUsers({
    userIds: matchingDonors.map((donor) => donor._id),
    title: "New Blood Request Nearby",
    message: `${request.bloodGroup} request created for ${request.city}.`,
    type: "request",
    meta: {
      requestId: String(request._id),
    },
  });

  return request;
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

  await createNotification({
    user: request.createdBy,
    title: "Request Status Updated",
    message: `Your request for ${request.bloodGroup} is now ${status}.`,
    type: "status",
    meta: {
      requestId: String(request._id),
      status,
    },
  });

  return request;
};

module.exports = {
  createRequestService,
  getMyRequestsService,
  getRequestsService,
  updateRequestStatusService,
};
