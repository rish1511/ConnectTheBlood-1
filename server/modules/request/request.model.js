const mongoose = require("mongoose");

const requestSchema =
  new mongoose.Schema(
    {
      patientName: {
        type: String,
        required: true,
        trim: true,
      },

      bloodGroup: {
        type: String,
        required: true,
      },

      hospital: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      urgency: {
        type: String,
        enum: [
          "low",
          "medium",
          "high",
          "critical",
        ],
        default: "medium",
      },

      unitsRequired: {
        type: Number,
        default: 1,
      },

      contactNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, "Contact number must be exactly 10 digits"],
      },

      status: {
        type: String,
        enum: [
          "pending",
          "accepted",
          "completed",
          "cancelled",
        ],
        default: "pending",
      },

      createdBy: {
        type:
          mongoose.Schema
            .Types.ObjectId,
        ref: "User",
      },

      acceptedBy: {
        type:
          mongoose.Schema
            .Types.ObjectId,
        ref: "User",
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

requestSchema.index({
  bloodGroup: 1,
  city: 1,
  status: 1,
});

const Request =
  mongoose.model(
    "Request",
    requestSchema
  );

module.exports =
  Request;
