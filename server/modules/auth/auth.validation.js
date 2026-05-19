
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
    .trim()
    .min(1, "Email or phone is required")
    .refine(
      (value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/;

        return emailPattern.test(value) || phonePattern.test(value);
      },
      {
        message: "Enter a valid email address or 10-digit phone number",
      },
    ),

  password: z
    .string()
    .min(1, "Password is required"),
});

const resetPasswordSchema = z
  .object({
    phone: z
      .string()
      .trim()
      .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

module.exports = {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
};
