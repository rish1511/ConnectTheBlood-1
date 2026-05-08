const {
  registerUser,
  loginUser,
} = require("./auth.service");

const {
  registerSchema,
  loginSchema,
} = require("./auth.validation");

const registerController = async (
  req,
  res
) => {
  try {
    // validate
    const validatedData =
      registerSchema.parse(req.body);

    // service
    const result =
      await registerUser(validatedData);

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const loginController = async (
  req,
  res
) => {
  try {
    // validate
    const validatedData =
      loginSchema.parse(req.body);

    // service
    const result =
      await loginUser(validatedData);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};