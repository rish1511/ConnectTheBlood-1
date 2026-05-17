
const { z } = require("zod");
const { USER_ROLES, BLOOD_GROUPS } = require("./auth.constants");

const registerSchema = z.object({
  fullName: z
    .string()
    .min(3)
    .max(50),

  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(8),

  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  role: z
    .enum(Object.values(USER_ROLES))
    .optional()
    .default(USER_ROLES.SEEKER),

  city: z
    .string()
    .optional(),

  bloodGroup: z
    .enum(BLOOD_GROUPS)
    .optional(),
});

const loginSchema = z.object({
  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(8),
});

module.exports = {
  registerSchema,
  loginSchema,
};
