const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part after 'Bearer '
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, jwtSecret);
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  req.userId = decodedToken.userId;
  next();
};
