const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyUser } = require("../middleware/authMiddleware");
const User = require("../models/User");

// =========================
// Auth Routes
// =========================
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// =========================
// Public Routes
// =========================
router.get("/venues", userController.getAllVenues);
router.get("/venues/:id", userController.getVenueById);

// =========================
// Authenticated User Routes
// =========================
router.post("/bookings", verifyUser, userController.bookVenue);
router.get("/bookings", verifyUser, userController.getUserBookings);
router.get("/profile", verifyUser, userController.getProfile);
router.put("/profile", verifyUser, userController.updateProfile);

// =========================
// Get User by Firebase UID
// =========================
router.get("/users/:firebaseId", async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.params.firebaseId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
