// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post('/google-login', async (req, res) => {
  const { name, email, phone, picture } = req.body;  // include photo here

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, phone, picture });  // save photo URL
      await user.save();
    } else {
      // Optionally update photo if it has changed
      if (picture && user.picture !== picture) {
        user.picture = picture;  // update photo URL
        await user.save();
      }
    }

    res.status(200).json({ message: "User saved successfully" });
  } catch (err) {
    console.error("MongoDB save error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
