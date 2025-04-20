const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "venueOwner"],
      default: "user",
    },
    avatar: {
      type: String, // Optional profile picture URL
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Fix OverwriteModelError by checking if already compiled
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
