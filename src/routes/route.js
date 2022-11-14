const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")

router.post('/authors', authorController.author)

module.exports = router;
