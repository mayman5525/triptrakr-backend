const mongoose = require("mongoose");
const user_history_Schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    //to do create the schema for the user history
  },
  { timestamps: true }
);
module.exports = mongoose.model("user_history", user_history_Schema);
