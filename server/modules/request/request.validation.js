const { z } = require("zod");

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["low", "medium", "high", "critical"];
const requestStatuses = ["pending", "accepted", "completed", "cancelled"];

const createRequestSchema = z.object({
  patientName: z.string().trim().min(3).max(50),
  bloodGroup: z.enum(bloodGroups),
  hospital: z.string().trim().min(2).max(100),
  city: z.string().trim().min(2).max(50),
  urgency: z.enum(urgencyLevels).optional(),
  unitsRequired: z.coerce.number().int().min(1).max(10).optional(),
  contactNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
});

const updateRequestStatusSchema = z.object({
  status: z.enum(requestStatuses),
});

module.exports = {
  createRequestSchema,
  updateRequestStatusSchema,
};
