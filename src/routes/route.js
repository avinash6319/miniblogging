const express = require('express');


const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const middleware = require("../middleware/auth")


router.post("/authors", authorController.createAuthor)

router.post("/blogs", blogController.createBlog)

router.get("/blogs", blogController.blogDetails)

router.put("/blogs/:blogId", blogController.updateBlog)

router.delete("/blogs/:blogId", middleware.Authentication,middleware.Authorisation, blogController.deleteBlog)

router.delete("/blogs", middleware.Authentication, blogController.deleteByQuery)

router.post("/login", authorController.login)


module.exports = router;