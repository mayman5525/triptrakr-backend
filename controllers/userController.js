const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { Result } = require("express-validator");
const { validationResult, check } = require("express-validator");
const dotenv = require("dotenv");
const sec = process.env.SECRET;

dotenv.config();
exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { email, password, first_name, last_name, is_admin } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log("Entered Password:", password);
    // console.log("Hashed Password:", hashedPassword);

    const user = new User({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      is_admin,
    });

    const result = await user.save();
    console.log("User saved with hashed password:", result.password);

    res.status(201).json({
      message: "User created successfully",
      userId: result._id,
      user_email: result.email,
      user_profile_photo: result.profile_url,
      user_first_name: result.first_name,
      user_last_name: result.last_name,
      user_package_kind: result.package_kind,
      user_phone: result.phone,
      is_admin: result.is_admin,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.logIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }

    // console.log("Entered Password:", password);
    // console.log("Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("Password Match:", isMatch);

    if (!isMatch) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.SECRET // Ensure you use the correct secret key
    );

    res.status(200).json({ token, userId: user._id.toString() });
  } catch (err) {
    console.error("Error during login:", err);

    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.signOut = (req, res, next) => {
  try {
    res.clearCookie(
      "token",
      (httpOnly = true),
      (secure = true),
      (sameSite = "strict"),
      (signed = true),
      (maxAge = 1000 * 60 * 60 * 24 * 7)
    );
    res.set({
      "Cache-Control": "no-store",
      Pragma: "no-cache",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    });
    res.status(200).json({
      message: "user signout successfully",
    });
  } catch (error) {
    console.error("Error during signout: ", error);

    // Send an error response
    res.status(500).json({
      error: "An error occurred during signout",
    });
  }
};
