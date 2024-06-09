const BlogModel = require("../models/BlogModel");

exports.getBlogs = async (req, res, next) => {
  try {
    const MyBlogs = await BlogModel.find({});
    res.status(200).json({ MyBlogs });
  } catch (error) {
    next(error);
  }
};

exports.getBlogsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const MyBlog = await BlogModel.findById(id);
    res.status(200).json({ MyBlog });
  } catch (error) {
    next(error);
  }
};

exports.AddBlogs = async (req, res, next) => {
  const { title, content, Description, image_description } = req.body;
  const newBlog = new BlogModel({
    title,
    content,
    Description,
    image_description,
  });

  try {
    await newBlog.save();
    res.status(201).json({
      message: "Blog Added Successfully",
      newBlog,
    });
  } catch (error) {
    next(error);
  }
};

exports.EditBlogs = async (req, res, next) => {
  const { id } = req.params;
  const { title, subtitle, content } = req.body;

  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, subtitle, content },
      { new: true }
    );
    res.status(200).json({
      message: "Blog Updated Successfully",
      updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

exports.DeleteBlogs = async (req, res, next) => {
  try {
    const { id } = req.params;
    await BlogModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
