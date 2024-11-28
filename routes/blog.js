const express = require('express');
const { openAddBlogPage, addNewBlog, loadBlogById } = require('../controllers/blog');
const fileUpload = require("../middlewares/fileUpload");

const router = express.Router();

router.get('/:blogId', loadBlogById);
router.get('/', openAddBlogPage);
router.post('/', fileUpload.single("coverImage"), addNewBlog);

module.exports = router;