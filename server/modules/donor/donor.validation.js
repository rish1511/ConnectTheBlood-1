const z = require("zod");

const updateProfileSchema =
  z.object({
    fullName: z
      .string()
      .min(
        3,
        "Full name must be at least 3 characters"
      )
      .max(
        50,
        "Full name cannot exceed 50 characters"
      )
      .optional(),

    phone: z
      .string()
      .trim()
      .regex(
        /^\d{10}$/,
        "Phone number must be exactly 10 digits"
      )
      .optional(),

    city: z
      .string()
      .min(
        2,
        "City name is too short"
      )
      .max(
        50,
        "City name too long"
      )
      .optional(),

    bloodGroup: z
      .enum([
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ])
      .optional(),

    profileImage: z
      .string()
      .url(
        "Invalid profile image URL"
      )
      .optional(),
  });

const updateAvailabilitySchema =
  z.object({
    available: z.boolean({
      required_error:
        "Availability is required",
    }),
  });

module.exports = {
  updateProfileSchema,
  updateAvailabilitySchema,
};
