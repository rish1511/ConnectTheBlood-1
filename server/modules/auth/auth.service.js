const bcrypt = require("bcryptjs");

const User = require("./auth.model");

const generateToken = require("../../utils/generateToken");
const ApiError = require("../../utils/apiError");

const registerUser = async (payload) => {
  const { fullName, email, password, phone, role, city, bloodGroup } = payload;

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
    role,
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
    },
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
