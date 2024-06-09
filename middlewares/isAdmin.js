const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (!req.is_admin) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};
