const express = require("express");
const router = express.Router();
const flightController = require("../controllers/BlogController");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

router.use(isAuth);

router.get("/", flightController.getAllFlights);
router.get("/:id", flightController.getFlightById);
router.post("/", flightController.AddFlight);
router.delete("/:id", flightController.DeleteFlight);

module.exports = router;
