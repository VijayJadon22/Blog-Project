const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const {connectToMongoDB} = require('./config/config');



const app = express();
const PORT = 8005;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false })); //middleware to handle form data


app.get("/", (req, res) => {
    return res.render("home");
});

app.use("/user", userRouter);


app.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);
    connectToMongoDB();
});
    