const Request = require("../request/request.model");
const User = require("../auth/auth.model");
const { USER_ROLES } = require("../auth/auth.constants");
const ApiError = require("../../utils/apiError");

const escapeRegex = (value = "") => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const getCityFilter = (city = "") => {
  const primaryCity = city.split(",")[0]?.trim();

  if (!primaryCity) {
    return undefined;
  }

  return new RegExp(`^${escapeRegex(primaryCity)}`, "i");
};

const getRecipientProfileService = async (userId) => {
  const recipient = await User.findById(userId).select("-password");

  if (!recipient) {
    throw new ApiError(404, "Recipient not found");
  }

  return recipient;
};

const getNearbyDonors = async (recipient, latestRequest) => {
  const bloodGroup = latestRequest?.bloodGroup || recipient.bloodGroup;
  const city = latestRequest?.city || recipient.city;

  const donorQuery = {
    $or: [{ roles: USER_ROLES.DONOR }, { role: USER_ROLES.DONOR }],
    available: true,
  };

  if (bloodGroup) {
    donorQuery.bloodGroup = bloodGroup;
  }

  const cityFilter = getCityFilter(city);

  if (cityFilter) {
    donorQuery.city = cityFilter;
  }

  return User.find(donorQuery)
    .select("fullName phone city bloodGroup location available lastDonationDate")
    .sort({
      updatedAt: -1,
    })
    .limit(6);
};

const getAvailableDonors = async () => {
  const donorQuery = {
    $or: [{ roles: USER_ROLES.DONOR }, { role: USER_ROLES.DONOR }],
    available: true,
  };

  return User.find(donorQuery)
    .select("fullName phone city bloodGroup location available lastDonationDate")
    .sort({
      updatedAt: -1,
    });
};

const getRecipientDashboardService = async (userId) => {
  const recipient = await User.findById(userId).select(
    `
      fullName
      email
      phone
      city
      bloodGroup
      location
      role
      profileImage
    `,
  );

  if (!recipient) {
    throw new ApiError(404, "Recipient not found");
  }

  const requests = await Request.find({
    createdBy: recipient._id,
  })
    .populate("acceptedBy", "fullName phone bloodGroup city available")
    .sort({
      createdAt: -1,
    });

  const stats = requests.reduce(
    (acc, request) => {
      acc.totalRequests += 1;
      acc.totalUnits += request.unitsRequired || 0;

      if (request.status === "pending") {
        acc.pendingRequests += 1;
      }

      if (request.status === "accepted") {
        acc.acceptedRequests += 1;
      }

      if (request.status === "completed") {
        acc.completedRequests += 1;
      }

      if (request.urgency === "critical") {
        acc.criticalRequests += 1;
      }

      return acc;
    },
    {
      totalRequests: 0,
      pendingRequests: 0,
      acceptedRequests: 0,
      completedRequests: 0,
      criticalRequests: 0,
      totalUnits: 0,
    },
  );

  const latestOpenRequest =
    requests.find((request) => ["pending", "accepted"].includes(request.status)) ||
    requests[0];

  const nearbyDonors = await getNearbyDonors(recipient, latestOpenRequest);
  const availableDonors = await getAvailableDonors();

  return {
    recipient,
    stats,
    requests,
    nearbyDonors,
    availableDonors,
  };
};

module.exports = {
  getRecipientProfileService,
  getRecipientDashboardService,
};
