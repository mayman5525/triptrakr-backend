const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const isValidPassword = async (user_id, password) => {
  try {
    // Ensure user_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      console.error("Invalid user ID format:", user_id);
      return false;
    }

    // Find the user by ID
    const userRecord = await User.findById(user_id);
    console.log("User Record:", userRecord);

    // If user is not found, return false
    if (!userRecord) {
      return false;
    }

    // Compare the provided password with the hashed password in the user record
    const isValid = await bcrypt.compare(password, userRecord.password);
    console.log("Provided Password:", password);
    console.log("Stored Password Hash:", userRecord.password);
    console.log("Password isValid:", isValid);

    return isValid;
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error validating password:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

module.exports = isValidPassword;

// const isValidPassword = async (user_id, password) => {
//   try {
//     // Ensure user_id is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(user_id)) {
//       console.error("Invalid user ID format:", user_id);
//       return false;
//     }

//     // Find the user by ID
//     const userRecord = await User.findById(user_id);
//     if (!userRecord) {
//       return false;
//     }

//     // Compare the provided password with the hashed password in the user record
//     const isValid = await bcrypt.compare(password, userRecord.password);
//     return isValid;
//   } catch (error) {
//     console.error("Error validating password:", error);
//     throw error;
//   }
// };
