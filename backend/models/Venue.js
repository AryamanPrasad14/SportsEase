const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  sport: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Venue', venueSchema);
