const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const userController = require("../controllers/userController");
const { body, check } = require("express-validator");
const bcrypt = require("bcryptjs");

router.post(
  "/signup", // Ensure the route path is correct
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already in use");
          }
        });
      })
      .normalizeEmail(
        { gmail_remove_dots: false, gmail_remove_subaddress: false },
        { gmail_remove_dots: false }
      ),
    check("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    check("first_name").trim().notEmpty().withMessage("First name is required"),
    check("last_name").trim().notEmpty().withMessage("Last name is required"),
  ],
  userController.signUp
);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(
        { gmail_remove_dots: false, gmail_remove_subaddress: false },
        { gmail_remove_dots: false }
      ),
    check("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.logIn
);
router.post("/logout", userController.signOut);

module.exports = router;
