const mongoose = require('mongoose');

const venueOwnerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  venues: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue"
  }]
});

module.exports = mongoose.model("VenueOwner", venueOwnerSchema);
