const express = require("express");
const router = express.Router();
const blogController = require("../controllers/BlogController");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

router.use(isAuth);

router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlogsById);
router.post("/", isAdmin, blogController.AddBlogs);
router.patch("/edit/:id", isAdmin, blogController.EditBlogs);
router.delete("/delete/:id", isAdmin, blogController.DeleteBlogs);

module.exports = router;
