const { z } = require("zod");

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["low", "medium", "high", "critical"];
const requestStatuses = ["pending", "accepted", "completed", "cancelled"];

const createRequestSchema = z.object({
  patientName: z.string().min(3).max(50),
  bloodGroup: z.enum(bloodGroups),
  hospital: z.string().min(2).max(100),
  city: z.string().min(2).max(50),
  urgency: z.enum(urgencyLevels).optional(),
  unitsRequired: z.number().int().min(1).max(10).optional(),
  contactNumber: z.string().min(10).max(15),
});

const updateRequestStatusSchema = z.object({
  status: z.enum(requestStatuses),
});

module.exports = {
  createRequestSchema,
  updateRequestStatusSchema,
};
