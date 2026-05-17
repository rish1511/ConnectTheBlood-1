const Request = require("../request/request.model");
const User = require("../auth/auth.model");
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

const getDonorProfileService = async (userId) => {
  const donor = await User.findById(userId).select("-password");

  if (!donor) {
    throw new ApiError(404, "Donor not found");
  }

  return donor;
};

const updateDonorProfileService = async (userId, updateData) => {
  const allowedFields = [
    "fullName",
    "phone",
    "city",
    "bloodGroup",
    "profileImage",
  ];

  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  const updatedDonor = await User.findByIdAndUpdate(userId, filteredData, {
    returnDocument: "after",
    runValidators: true,
  }).select("-password");

  if (!updatedDonor) {
    throw new ApiError(404, "Donor not found");
  }

  return updatedDonor;
};

const updateAvailabilityService = async (userId, available) => {
  const donor = await User.findByIdAndUpdate(
    userId,
    { available },
    {
      returnDocument: "after",
    },
  ).select("available fullName bloodGroup");

  if (!donor) {
    throw new ApiError(404, "Donor not found");
  }

  return donor;
};

const getDonorDashboardService = async (userId) => {
  const donor = await User.findById(userId).select(
    `
        fullName
        email
        city
        bloodGroup
        available
        lastDonationDate
        profileImage
      `,
  );

  if (!donor) {
    throw new ApiError(404, "Donor not found");
  }

  const cityFilter = getCityFilter(donor.city);

  const emergencyQuery = {
    bloodGroup: donor.bloodGroup,
    status: "pending",
  };

  if (cityFilter) {
    emergencyQuery.city = cityFilter;
  }

  const [totalDonations, unitsDonated, emergencyRequestsCount] =
    await Promise.all([
      Request.countDocuments({
        acceptedBy: userId,
        status: "completed",
      }),
      Request.aggregate([
        {
          $match: {
            acceptedBy: donor._id,
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$unitsRequired",
            },
          },
        },
      ]),
      Request.countDocuments(emergencyQuery),
    ]);

  return {
    donor,
    stats: {
      totalDonations,
      unitsDonated: unitsDonated[0]?.total || 0,
      emergencyRequestsCount,
    },
  };
};

const getEmergencyRequestService = async (userId) => {
  // donor find
  const donor = await User.findById(userId);

  if (!donor) {
    throw new ApiError(404, "Donor not found");
  }

  const cityFilter = getCityFilter(donor.city);

  const query = {
    bloodGroup: donor.bloodGroup,
    status: "pending",
  };

  if (cityFilter) {
    query.city = cityFilter;
  }

  // matching requests
  const requests = await Request.find(query)
    .sort({
      createdAt: -1,
    })
    .select(
      `
        patientName
        bloodGroup
        hospital
        city
        urgency
        status
        createdAt
      `,
    );

  return requests;
};

const acceptEmergencyRequestService = async (userId, requestId) => {
  const donor = await User.findById(userId);

  if (!donor) {
    throw new ApiError(404, "Donor not found");
  }

  if (!donor.available) {
    throw new ApiError(400, "Please mark yourself available before accepting requests");
  }

  const request = await Request.findById(requestId);

  if (!request) {
    throw new ApiError(404, "Emergency request not found");
  }

  if (request.status !== "pending") {
    throw new ApiError(400, "This request is no longer pending");
  }

  if (request.bloodGroup !== donor.bloodGroup) {
    throw new ApiError(400, "Blood group does not match this request");
  }

  const cityFilter = getCityFilter(donor.city);
  const cityMatches = cityFilter ? cityFilter.test(request.city) : true;

  if (!cityMatches) {
    throw new ApiError(400, "This request is outside your city");
  }

  request.status = "accepted";
  request.acceptedBy = donor._id;
  donor.available = false;

  await Promise.all([request.save(), donor.save()]);

  return request;
};

const getAcceptedRequestsService = async (userId) => {
  const donor = await User.findById(userId);

  if (!donor) {
    throw new ApiError(404, "Donor not found");
  }

  return Request.find({
    acceptedBy: donor._id,
    status: "accepted",
  })
    .sort({
      updatedAt: -1,
    })
    .select(
      `
        patientName
        bloodGroup
        hospital
        city
        urgency
        unitsRequired
        contactNumber
        status
        createdAt
        updatedAt
      `,
    );
};

const completeEmergencyRequestService = async (userId, requestId) => {
  const donor = await User.findById(userId);

  if (!donor) {
    throw new ApiError(404, "Donor not found");
  }

  const request = await Request.findOne({
    _id: requestId,
    acceptedBy: donor._id,
  });

  if (!request) {
    throw new ApiError(404, "Accepted request not found");
  }

  if (request.status !== "accepted") {
    throw new ApiError(400, "Only accepted requests can be completed");
  }

  request.status = "completed";
  donor.available = true;
  donor.lastDonationDate = new Date();

  await Promise.all([request.save(), donor.save()]);

  return request;
};

const getDonationHistoryService = async (userId) => {
  const donor = await User.findById(userId);

  if (!donor) {
    throw new ApiError(404, "Donor not found");
  }

  return Request.find({
    acceptedBy: donor._id,
    status: "completed",
  })
    .sort({
      updatedAt: -1,
    })
    .select(
      `
        patientName
        bloodGroup
        hospital
        city
        urgency
        unitsRequired
        contactNumber
        status
        createdAt
        updatedAt
      `,
    );
};

module.exports = {
  getDonorProfileService,
  updateDonorProfileService,
  updateAvailabilityService,
  getDonorDashboardService,
  getEmergencyRequestService,
  acceptEmergencyRequestService,
  getAcceptedRequestsService,
  completeEmergencyRequestService,
  getDonationHistoryService,
};
