const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyAdmin } = require("../middleware/authMiddleware");

// User management
router.get("/users", verifyAdmin, adminController.getAllUsers);
router.put("/users/:id", verifyAdmin, adminController.updateUserRole);
router.delete("/users/:id", verifyAdmin, adminController.deleteUser);

// Venue management
router.get("/venues", verifyAdmin, adminController.getAllVenues);
router.put("/venues/:id", verifyAdmin, adminController.updateVenue);
router.delete("/venues/:id", verifyAdmin, adminController.deleteVenue);

// Booking view
router.get("/bookings", verifyAdmin, adminController.getAllBookings);

module.exports = router;
