const ApiError = require("../utils/apiError");
const { ZodError } = require("zod");

const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse(req.body);

    req.body = validatedData;

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = error.issues || error.errors || [];
      const message = issues.map((e) => e.message).join(", ");
      return next(new ApiError(400, message));
    }

    next(error);
  }
};

module.exports = validate;
