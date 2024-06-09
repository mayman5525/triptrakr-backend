const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  flight_number: {
    type: String,
    required: false,
  },
  is_available: {
    type: Boolean,
    required: true,
  },
  stops: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  airline: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  baggage: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Trip", tripSchema);
