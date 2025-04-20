const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUserBookings, createBooking } = require('../controllers/bookingController');

router.get('/', auth, getUserBookings);
router.post('/', auth, createBooking);

module.exports = router;
