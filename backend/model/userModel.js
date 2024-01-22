const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    courseType: {
      type: String,
      required: false,
    },
    paid: {
      type: Boolean,
      required: true,
    },
    triedToUpdate: {
      type: Boolean,
      required: true,
    },
    resetPasswordOTP: {
      code: {
        type: String,
        required: false,
      },
      expiresAt: {
        type: Date,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
