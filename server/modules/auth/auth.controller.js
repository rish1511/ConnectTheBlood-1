const {
  registerUser,
  loginUser,
  becomeDonor,
  resetPassword,
  toAuthUser,
} = require("./auth.service");
const asyncHandler = require("../../utils/asyncHandler");
const apiResponse = require("../../utils/apiResponse");

const registerController = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);
  apiResponse(res, 201, "User registered successfully", result);

});

const loginController = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);
  apiResponse(res, 200, "Login successful", result);
});

const resetPasswordController = asyncHandler(async (req, res) => {
  await resetPassword(req.body);
  apiResponse(res, 200, "Password reset successful");
});

const becomeDonorController = asyncHandler(async (req, res) => {
  const user = await becomeDonor(req.user.id);

  apiResponse(res, 200, "You are now a donor", user);
});

const getMeController = asyncHandler(async (req, res) => {
  apiResponse(res, 200, "Current user fetched successfully", toAuthUser(req.user));
});

module.exports = {
  registerController,
  loginController,
  resetPasswordController,
  becomeDonorController,
  getMeController,
};
