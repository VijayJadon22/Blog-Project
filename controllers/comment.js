const Comment = require('../models/comment');

async function createComment(req, res) {
    try {
        const blogId = req.params.blogId;
        const user = req.user;
        const content = req.body.content;
        await Comment.create({
            content,
            blogId,
            createdBy: user._id
        });
        return res.redirect(`/blog/${blogId}`);

    } catch (error) {
        console.error("Error: ", error);
    }
}

module.exports = {
    createComment,
}