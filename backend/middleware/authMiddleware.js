const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Utility to extract and verify JWT
const extractUserFromToken = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return { error: { status: 401, message: "No token, access denied" } };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return { error: { status: 401, message: "User not found" } };
    }
    return { user };
  } catch (err) {
    return { error: { status: 403, message: "Token is not valid" } };
  }
};

// Middleware: General user authentication
const verifyUser = async (req, res, next) => {
  const { user, error } = await extractUserFromToken(req, res);
  if (error) return res.status(error.status).json({ message: error.message });

  req.user = user;
  next();
};

// Middleware: Admin role check
const verifyAdmin = async (req, res, next) => {
  const { user, error } = await extractUserFromToken(req, res);
  if (error) return res.status(error.status).json({ message: error.message });

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }

  req.user = user;
  next();
};

// Middleware: Venue Owner role check
const verifyVenueOwner = async (req, res, next) => {
  const { user, error } = await extractUserFromToken(req, res);
  if (error) return res.status(error.status).json({ message: error.message });

  if (user.role !== "venueOwner") {
    return res.status(403).json({ message: "Access denied, venue owner only" });
  }

  req.user = user;
  next();
};

module.exports = {
  verifyUser,
  verifyAdmin,
  verifyVenueOwner,
};