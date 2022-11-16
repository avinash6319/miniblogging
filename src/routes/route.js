const express = require('express');


const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const middleware=require("../middleware/auth")


router.post("/authors",authorController.createAuthor)

router.post("/blog",blogController.createBlog)

router.get("/detail",blogController.blogDetails)

router.put("/blogs/:blogId",middleware,blogController.updateBlog)

router.delete("/blogs/:blogId",middleware,blogController.deleteBlog)

router.delete("/blogs",middleware,blogController.deleteByQuery)

router.post("/login",authorController.login)







module.exports = router;