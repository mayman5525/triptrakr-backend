const User = require("../models/userModel");
const Flight = require("../models/tripModel");
const express = require("express");
const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ message: "internal server error " });
  }
});

router.get("/flights", async (req, res) => {
  try {
    const flight = Flight.find();
    res.status(200).json({ flight });
  } catch (error) {
    console.error("Error while fetching flights:", error);
    res.status(500).json({ message: "internal server error " });
  }
});

module.exports = router;
