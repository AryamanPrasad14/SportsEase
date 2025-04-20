const express = require("express");
const router = express.Router();
const venueOwnerController = require("../controllers/venueOwnerController");
const { verifyVenueOwner } = require("../middleware/authMiddleware");

// Venue management
router.post("/venues", verifyVenueOwner, venueOwnerController.addVenue);
router.put("/venues/:id", verifyVenueOwner, venueOwnerController.updateVenue);
router.delete("/venues/:id", verifyVenueOwner, venueOwnerController.deleteVenue);

// Booking handling
router.get("/bookings", verifyVenueOwner, venueOwnerController.getBookings);
router.put("/bookings/:id", verifyVenueOwner, venueOwnerController.respondToBooking);

// Payment info (optional, based on features)
router.get("/payments", verifyVenueOwner, venueOwnerController.getPayments);

module.exports = router;
