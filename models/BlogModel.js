const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/dwnvh8vn4/image/upload/v1688294025/test_rhvhku.png",
    },
    image_description: {
      type: String,
      required: false,
      default: "Blog Image",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
