const bcrypt = require("bcryptjs");

const User = require("./auth.model");
const { USER_ROLES } = require("./auth.constants");

const generateToken = require("../../utils/generateToken");
const ApiError = require("../../utils/apiError");
const { notifyRole } = require("../notification/notification.service");

const normalizeRoles = (user) => {
  const allowedRoles = Object.values(USER_ROLES);
  const roles = [
    ...(Array.isArray(user.roles) ? user.roles : typeof user.roles === "string" ? [user.roles] : []),
    ...(typeof user.role === "string" ? [user.role] : []),
  ].filter((role) => allowedRoles.includes(role));

  return [...new Set(roles.length ? roles : [USER_ROLES.SEEKER])];
};

const getPrimaryRole = (roles = []) => {
  const priority = [
    USER_ROLES.ADMIN,
    USER_ROLES.BLOODBANK,
    USER_ROLES.DONOR,
    USER_ROLES.SEEKER,
  ];

  return priority.find((role) => roles.includes(role)) || USER_ROLES.SEEKER;
};

const toAuthUser = (user) => {
  const roles = normalizeRoles(user);

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: getPrimaryRole(roles),
    roles,
    phone: user.phone,
    city: user.city,
    bloodGroup: user.bloodGroup,
    available: user.available,
  };
};

const registerUser = async (payload) => {
  const { fullName, email, password, phone, city, bloodGroup } = payload;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    phone,
    role: USER_ROLES.SEEKER,
    roles: [USER_ROLES.SEEKER],
    city,
    bloodGroup,
  });

  const token = generateToken(user);

  return {
    user: toAuthUser(user),
    token,
  };
};

const loginUser = async (payload) => {
  const identifier = String(payload.email || "").trim();
  const { password } = payload;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/;

  const query = emailPattern.test(identifier)
    ? { email: identifier.toLowerCase() }
    : phonePattern.test(identifier)
    ? { phone: identifier }
    : { email: identifier.toLowerCase() };

  const user = await User.findOne(query).select("+password");

  if (!user) {
    throw new ApiError(404, "Invalid credentials");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (user.isBlocked) {
    throw new ApiError(403, "Account blocked");
  }

  const roles = normalizeRoles(user);
  user.roles = roles;
  user.role = getPrimaryRole(roles);
  user.lastLogin = new Date();

  await user.save();

  const token = generateToken(user);

  return {
    user: toAuthUser(user),
    token,
  };
};

const resetPassword = async (payload) => {
  const { phone, password } = payload;

  const user = await User.findOne({ phone }).select("+password");

  if (!user) {
    throw new ApiError(404, "No account found for this phone number");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();
};

const becomeDonor = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.bloodGroup) {
    throw new ApiError(400, "Please add blood group before becoming a donor");
  }

  if (!user.city) {
    throw new ApiError(400, "Please add city before becoming a donor");
  }

  const roles = normalizeRoles(user);

  const wasDonor = roles.includes(USER_ROLES.DONOR);

  if (!wasDonor) {
    roles.push(USER_ROLES.DONOR);
  }

  user.roles = roles;
  user.role = getPrimaryRole(roles);
  user.available = true;

  await user.save();

  if (!wasDonor) {
    await notifyRole({
      role: USER_ROLES.ADMIN,
      title: "New Donor Registered",
      message: `${user.fullName} became a donor (${user.bloodGroup || "N/A"}, ${user.city || "N/A"}).`,
      type: "admin",
      meta: {
        userId: String(user._id),
      },
    });
  }

  return toAuthUser(user);
};

module.exports = {
  registerUser,
  loginUser,
  resetPassword,
  becomeDonor,
  toAuthUser,
};
