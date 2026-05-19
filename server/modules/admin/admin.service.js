const User = require("../auth/auth.model");
const Request = require("../request/request.model");
const ApiError = require("../../utils/apiError");
const { USER_ROLES } = require("../auth/auth.constants");
const { createNotification } = require("../notification/notification.service");

const buildNamedCounts = (items, keyName = "_id") =>
  items
    .filter((item) => item[keyName])
    .map((item) => ({
      label: item[keyName],
      value: item.count,
    }));

const roleQuery = (role) => ({
  $or: [{ roles: role }, { role }],
});

const normalizeUserRoles = (user) => ({
  ...user,
  roles: user.roles?.length ? user.roles : [user.role || USER_ROLES.SEEKER],
});

const getPrimaryRole = (roles = []) => {
  const priority = [
    USER_ROLES.ADMIN,
    USER_ROLES.BLOODBANK,
    USER_ROLES.DONOR,
    USER_ROLES.SEEKER,
  ];

  return priority.find((role) => roles.includes(role)) || USER_ROLES.SEEKER;
};

const getAdminDashboardService = async () => {
  const [
    totalUsers,
    totalDonors,
    totalRecipients,
    bloodBanks,
    totalRequests,
    pendingRequests,
    completedDonations,
    availableDonors,
    users,
    recentRequests,
    bloodGroupDistribution,
    monthlyDonationAgg,
    cityRequestAgg,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments(roleQuery(USER_ROLES.DONOR)),
    User.countDocuments(roleQuery(USER_ROLES.SEEKER)),
    User.countDocuments(roleQuery(USER_ROLES.BLOODBANK)),
    Request.countDocuments(),
    Request.countDocuments({ status: "pending" }),
    Request.countDocuments({ status: "completed" }),
    User.countDocuments({
      ...roleQuery(USER_ROLES.DONOR),
      available: true,
      isBlocked: false,
    }),
    User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean(),
    Request.find()
      .populate("createdBy", "fullName phone city")
      .populate("acceptedBy", "fullName phone bloodGroup city")
      .sort({ createdAt: -1 })
      .limit(8)
      .lean(),
    User.aggregate([
      {
        $match: {
          $or: [{ roles: USER_ROLES.DONOR }, { role: USER_ROLES.DONOR }],
          bloodGroup: { $exists: true },
        },
      },
      { $group: { _id: "$bloodGroup", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]),
    Request.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: { $month: "$updatedAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    Request.aggregate([
      { $group: { _id: "$city", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]),
  ]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return {
    stats: {
      totalUsers,
      totalDonors,
      totalRecipients,
      bloodBanks,
      totalRequests,
      pendingRequests,
      completedDonations,
      availableDonors,
    },
    users: users.map(normalizeUserRoles),
    recentRequests,
    analytics: {
      bloodGroups: buildNamedCounts(bloodGroupDistribution),
      monthlyDonations: monthlyDonationAgg.map((item) => ({
        label: monthNames[item._id - 1],
        value: item.count,
      })),
      cityRequests: buildNamedCounts(cityRequestAgg),
    },
  };
};

const updateAdminUserStatusService = async (userId, payload) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isBlocked: Boolean(payload.isBlocked) },
    { new: true, runValidators: true },
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const updateAdminUserRoleService = async (userId, payload) => {
  const incomingRoles = Array.isArray(payload.roles)
    ? payload.roles
    : [payload.role].filter(Boolean);

  const roles = [...new Set(incomingRoles)];

  if (!roles.length) {
    throw new ApiError(400, "At least one role is required");
  }

  if (!roles.every((role) => Object.values(USER_ROLES).includes(role))) {
    throw new ApiError(400, "Invalid role");
  }

  const existingUser = await User.findById(userId).lean();

  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  const isAdminUser =
    existingUser.role === USER_ROLES.ADMIN ||
    (Array.isArray(existingUser.roles) && existingUser.roles.includes(USER_ROLES.ADMIN));

  if (isAdminUser && !roles.includes(USER_ROLES.ADMIN)) {
    throw new ApiError(
      400,
      "Admin role is permanent and cannot be removed once assigned",
    );
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      roles,
      role: getPrimaryRole(roles),
    },
    { new: true, runValidators: true },
  )
    .select("-password")
    .lean();

  return normalizeUserRoles(user);
};

const updateAdminRequestStatusService = async (requestId, payload) => {
  const allowedStatuses = ["pending", "accepted", "completed", "cancelled"];

  if (!allowedStatuses.includes(payload.status)) {
    throw new ApiError(400, "Invalid request status");
  }

  const request = await Request.findByIdAndUpdate(
    requestId,
    { status: payload.status },
    { new: true, runValidators: true },
  );

  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  await createNotification({
    user: request.createdBy,
    title: "Request Status Updated by Admin",
    message: `Your request for ${request.bloodGroup} is now ${payload.status}.`,
    type: "admin",
    meta: {
      requestId: String(request._id),
      status: payload.status,
    },
  });

  return request;
};

module.exports = {
  getAdminDashboardService,
  updateAdminUserStatusService,
  updateAdminUserRoleService,
  updateAdminRequestStatusService,
};
