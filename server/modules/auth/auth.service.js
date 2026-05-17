const bcrypt = require("bcryptjs");

const User = require("./auth.model");
const { USER_ROLES } = require("./auth.constants");

const generateToken = require("../../utils/generateToken");
const ApiError = require("../../utils/apiError");

const registerUser = async (payload) => {
  const { fullName, email, password, phone, city, bloodGroup } = payload;

  // check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    phone,
    role: USER_ROLES.SEEKER,
    city,
    bloodGroup,
  });

  // generate token
  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      city: user.city,
      bloodGroup: user.bloodGroup,
    },
    token,
  };
};

const loginUser = async (payload) => {
  const { email, password } = payload;

  // get password manually
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(404, "Invalid credentials");
  }

  // compare password
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid credentials");
  }

  // blocked check
  if (user.isBlocked) {
    throw new ApiError(403, "Account blocked");
  }

  // update last login
  user.lastLogin = new Date();

  await user.save();

  // generate token
  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      city: user.city,
      bloodGroup: user.bloodGroup,
    },
    token,
  };
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

  user.role = USER_ROLES.DONOR;
  user.available = true;

  await user.save();

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    phone: user.phone,
    city: user.city,
    bloodGroup: user.bloodGroup,
    available: user.available,
  };
};

module.exports = {
  registerUser,
  loginUser,
  becomeDonor,
};
