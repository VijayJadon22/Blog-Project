const express = require('express');
const { createComment } = require("../controllers/comment");

const router = express.Router();

router.post("/:blogId", createComment);

module.exports = router;