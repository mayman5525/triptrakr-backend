const router = require("express").Router();
// const jwtCheck = require("../jwtCheck");
const User = require("../models/userModel");
const Trips = require("../models/tripModel");

router.get("/flights", async (req, res) => {
  try {
    const trips = await Trips.find().lean();
    res.status(200).json({ trips });
  } catch (error) {
    console.error("Error while fetching flights:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/flights", async (req, res, next) => {});

router.delete("/flights", async (req, res, next) => {});

module.exports = router;
