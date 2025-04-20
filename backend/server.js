const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const venueOwnerRoutes = require('./routes/venueOwnerRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// DB Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes); // Auth routes (login/register)
app.use('/api/users', userRoutes); // Public + user dashboard routes
app.use('/api/admin', adminRoutes); // Admin panel routes
app.use('/api/venue-owner', venueOwnerRoutes); // Venue owner dashboard routes

// Test route
app.get('/', (req, res) => {
  res.send('Sports Venue Booking API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
