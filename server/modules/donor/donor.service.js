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

  const [totalDonations, livesSaved, emergencyRequestsCount] =
    await Promise.all([
      Request.countDocuments({
        acceptedBy: userId,
        status: {
          $in: ["accepted", "completed"],
        },
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
      livesSaved: livesSaved[0]?.total || 0,
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

  await request.save();

  return request;
};

const getDonationHistoryService = async (userId) => {
  const donor = await User.findById(userId);

  if (!donor) {
    throw new ApiError(404, "Donor not found");
  }

  return Request.find({
    acceptedBy: donor._id,
    status: {
      $in: ["accepted", "completed"],
    },
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
  getDonationHistoryService,
};
