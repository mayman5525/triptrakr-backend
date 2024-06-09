// const mongoose = require("mongoose");
// const Trip = require("../models/tripModel");
// const dotenv = require("dotenv");
// dotenv.config();

// const MONGO_URI = process.env.DB_URL;

// const dummyTrips = [
//   {
//     from: "Cairo",
//     to: "New York",
//     stops: "Direct",
//     duration: "13h 30m",
//     price: 9000,
//     currency: "EGP",
//     airline: "Egypt Air",
//     class: "Economy Class",
//     baggage: "2 Bags",
//     weight: "40kg each",
//     is_available: true,
//     flight_number: "MS985",
//   },
//   {
//     from: "London",
//     to: "Dubai",
//     stops: "1 Stop",
//     duration: "7h 45m",
//     price: 4500,
//     currency: "GBP",
//     airline: "British Airways",
//     class: "Business Class",
//     baggage: "3 Bags",
//     weight: "30kg each",
//     is_available: true,
//     flight_number: "BA107",
//   },
//   {
//     from: "Sydney",
//     to: "Tokyo",
//     stops: "Direct",
//     duration: "9h 00m",
//     price: 7000,
//     currency: "AUD",
//     airline: "Qantas",
//     class: "Economy Class",
//     baggage: "2 Bags",
//     weight: "20kg each",
//     is_available: true,
//     flight_number: "QF25",
//   },
//   {
//     from: "Paris",
//     to: "Bangkok",
//     stops: "1 Stop",
//     duration: "11h 20m",
//     price: 6000,
//     currency: "EUR",
//     airline: "Air France",
//     class: "First Class",
//     baggage: "2 Bags",
//     weight: "25kg each",
//     is_available: false,
//     flight_number: "AF166",
//   },
//   {
//     from: "Mumbai",
//     to: "Toronto",
//     stops: "2 Stops",
//     duration: "18h 30m",
//     price: 1000,
//     currency: "INR",
//     airline: "Air India",
//     class: "Economy Class",
//     baggage: "1 Bag",
//     weight: "15kg each",
//     is_available: true,
//     flight_number: "AI187",
//   },
// ];

// mongoose
//   .connect()
//   .then(async () => {
//     console.log("Connected to MongoDB");
//     await Trip.insertMany(dummyTrips);
//     console.log("Dummy trips have been inserted successfully");
//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//     mongoose.disconnect();
//   });
