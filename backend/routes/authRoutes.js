const User = require("../models/User");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/requireLogin");

const otpLength = 6;

module.exports = (app) => {
  // Send OTP
  app.post("/api/v1/send/otp/number", async (req, res) => {
    try {
      const { phone } = req.body;

      // Generate the OTP
      const digits = "0123456789";
      let newOTP = "";
      for (let i = 0; i < otpLength; i++) {
        newOTP += digits[Math.floor(Math.random() * 10)];
      }

      console.log("newOTP: ", newOTP);

      // Check if user already exists
      const user = await User.findOne({ phone });

      // If user does not exist, create one
      if (!user) {
        const response = await User.create({ phone, otp: newOTP });
        res.status(201).json({ message: "OTP Sent Successfully", response });
      } else {
        const response = await User.updateOne({ phone }, { otp: newOTP });
        res.status(201).json({ message: "OTP Sent Successfully", response });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });

  // Verify OTP & Login
  app.post("/api/v1/verify/otp/number", async (req, res) => {
    try {
      const { phone, otp } = req.body;

      const user = await User.findOne({ phone });

      if (user && user.otp === otp) {
        const payload = {
          id: user._id,
          phone: user.phone,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        });

        res.status(200).json({ message: "Login Success", token });
      } else {
        res.status(400).json({ message: "Invalid OTP" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });

  // Get Current User
  app.get("/api/v1/current/user", requireLogin, async (req, res) => {
    try {
      const user = await User.findById(req.user.id, "-otp");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Current User", user });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });
};
