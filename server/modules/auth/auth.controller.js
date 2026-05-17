const { registerUser, loginUser, becomeDonor } = require("./auth.service");
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

const becomeDonorController = asyncHandler(async (req, res) => {
  const user = await becomeDonor(req.user.id);

  apiResponse(res, 200, "You are now a donor", user);
});

module.exports = {
  registerController,
  loginController,
  becomeDonorController,
};
