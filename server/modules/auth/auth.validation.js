
const { z } = require("zod");

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
    .min(6),

  phone: z
    .string()
    .min(10),

  role: z
    .string()
    .optional(),

  city: z
    .string()
    .optional(),

  bloodGroup: z
    .string()
    .optional(),
});

const loginSchema = z.object({
  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(6),
});

module.exports = {
  registerSchema,
  loginSchema,
};