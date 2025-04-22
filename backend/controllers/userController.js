const User = require("../models/User");
const Booking = require("../models/Booking");
const Venue = require("../models/Venue");

// Register a user who signed up via Firebase
const registerUser = async (req, res) => {
  try {
    const { id, name, email, role = "user" } = req.body;

    if (!id || !email || !name) {
      return res.status(400).json({ message: "Incomplete user data" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User already exists", user: existingUser });
    }

    const newUser = await User.create({
      firebaseId: id,
      name,
      email,
      role,
    });

    res
      .status(201)
      .json({ message: "User stored successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login placeholder (not used with Firebase)
const loginUser = async (req, res) => {
  res.status(501).json({ message: "Login handled via Firebase Auth" });
};

// View all available venues
const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ isAvailable: true });
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View single venue by ID
const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Book a venue
const bookVenue = async (req, res) => {
  try {
    const { venueId, date, timeSlot } = req.body;
    const userId = req.user.id;

    const booking = await Booking.create({
      user: userId,
      venue: venueId,
      date,
      timeSlot,
    });

    res.status(201).json({ message: "Venue booked successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View user's bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      "venue"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllVenues,
  getVenueById,
  bookVenue,
  getUserBookings,
  getProfile,
  updateProfile,
};
