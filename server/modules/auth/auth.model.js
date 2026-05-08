const mongoose = require("mongoose");

const { USER_ROLES, BLOOD_GROUPS } = require("./auth.constants");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.SEEKER,
    },

    city: {
      type: String,
      trim: true,
    },

    bloodGroup: {
      type: String,
      enum: BLOOD_GROUPS,
    },

    available: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    lastDonationDate: {
      type: Date,
    },

    profileImage: {
      type: String,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

userSchema.index({
  bloodGroup: 1,
  city: 1,
});

const User = mongoose.model("User", userSchema);

module.exports = User;


// 🧠 Index Meaning

// Database searching fast ho jati hai.

// Without index:
// database pura collection scan karega.