const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  permissions: {
    type: [String],
    default: ["manage_users", "manage_venues", "view_bookings"],
  },
});

module.exports = mongoose.model("Admin", adminSchema);
