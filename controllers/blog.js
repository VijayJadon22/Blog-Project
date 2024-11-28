const Blog = require('../models/blog');
const Comment = require("../models/comment");

function openAddBlogPage(req, res) {
    return res.render('addBlog', {
        user: req.user
    });
}

async function addNewBlog(req, res) {
    try {
        const user = req.user;
        const { title, content } = req.body;
        const fileURL = `/uploads/${req.user._id}/${req.file.filename}`;
        const blog = await Blog.create({
            title,
            content,
            coverImageURL: fileURL,
            author: user._id,
        });
        res.status(201).redirect(`/blog/${blog._id}`);

    } catch (error) {
        console.error("Error: ", error);
    }
}

async function loadBlogById(req, res) {
    try {
        const blogId = req.params.blogId;
        const user = req.user;
        const blog = await Blog.findById(blogId).populate("author");
        /*.populate("author") looks at the author field in the blog document, which should contain a reference (usually an ObjectId) to a user document, and replaces it with the actual user document.*/
        if (!blog) {
            return res.status(400).send("Blog not found");
        }
        const comments = await Comment.find({ blogId }).populate("createdBy");
        return res.status(200).render("blog", {
            user: user,
            blog,
            comments
        });
    } catch (error) {
        console.error("Error: ", error);
    }
}

module.exports = {
    openAddBlogPage,
    addNewBlog,
    loadBlogById
}