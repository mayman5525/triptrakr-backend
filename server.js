const express = require("express");
const bodyParser = require("body-parser");
const nodemon = require("nodemon");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const passport = require("passport");
const app = express();
const isAuth = require("./middlewares/isAuth");
const port = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    return res.status(200).json();
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Database connection /////////////////////////////////////////////////////////////////
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB_URL, {
    tls: true,
    tlsAllowInvalidCertificates: false,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err));

// my routes /////////////////////////////////////////////////////////////////
const authRoutes = require("./routes/auth_routes");
app.use("/api", authRoutes);

const getFlights = require("./routes/getFlights");
app.use("/api", isAuth, getFlights);

const BlogRoutes = require("./routes/blog_routes");
app.use("/api/blog", BlogRoutes);

// to do
// app.use("/api", integrationRoutes);
// app.use("/api", searchRoutes);
// app.use("/api", adminRoutes);
// app.use("/api", profileRoutes);
// app.use("/api", InfoRoutes);

//////////////////////////////////////////////////////////////////////////////
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const data = err.data || [];

  res.status(statusCode).json({ message: message, data: data });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
