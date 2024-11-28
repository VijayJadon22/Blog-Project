const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const { connectToMongoDB } = require('./config/config');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require('./models/blog');
const commentRouter = require('./routes/comment');



const app = express();
const PORT = 8005;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false })); //middleware to handle form data
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));


app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    return res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);


app.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);
    connectToMongoDB();
});
