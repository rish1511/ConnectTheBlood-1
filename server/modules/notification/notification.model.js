const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 400,
    },
    type: {
      type: String,
      required: true,
      default: "info",
      enum: ["info", "request", "admin", "donor", "status"],
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    meta: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

notificationSchema.index({ user: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
