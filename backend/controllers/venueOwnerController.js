const Venue = require("../models/Venue");
const Booking = require("../models/Booking");

// Add a new venue
const addVenue = async (req, res) => {
  try {
    const { name, location, price, description, isAvailable } = req.body;
    const newVenue = await Venue.create({
      name,
      location,
      price,
      description,
      isAvailable,
      owner: req.user.id, // Assuming JWT adds `req.user.id`
    });
    res.status(201).json({ message: "Venue added successfully", venue: newVenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a venue
const updateVenue = async (req, res) => {
  try {
    const updatedVenue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Venue updated", venue: updatedVenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a venue
const deleteVenue = async (req, res) => {
  try {
    await Venue.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Venue deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings for the owner's venues
const getBookings = async (req, res) => {
  try {
    const venues = await Venue.find({ owner: req.user.id });
    const venueIds = venues.map(v => v._id);
    const bookings = await Booking.find({ venue: { $in: venueIds } }).populate("user venue");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Respond to a booking (approve/reject)
const respondToBooking = async (req, res) => {
  try {
    const { status } = req.body; // e.g., "approved" or "rejected"
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user venue");

    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payment info (optional)
const getPayments = async (req, res) => {
  try {
    // Placeholder response
    res.status(200).json({ message: "Payment info placeholder" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addVenue,
  updateVenue,
  deleteVenue,
  getBookings,
  respondToBooking,
  getPayments,
};
