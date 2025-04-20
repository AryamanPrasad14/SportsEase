const express = require('express');
const router = express.Router();
const { getAllVenues, createVenue } = require('../controllers/venueController');

router.get('/', getAllVenues);
router.post('/', createVenue); // You can protect this route with admin auth later

module.exports = router;
