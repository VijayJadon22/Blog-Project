const User = require('../models/user');
const bcrypt = require('bcrypt');
const { createTokenForUser } = require('../services/authentication');

async function signUpUser(req, res) {
    try {
        const { fullName, email, password, role } = req.body;
        const profileImageURL = `/images/${req.file.filename}`;
        await User.create({
            fullName,
            email,
            password,
            profileImageURL,
            role
        });
        return res.render("signin");
    } catch (error) {
        console.error("Error: ", error);
    }
};
async function signInUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('signin', { error: "Invalid email" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.render('signin', { error: "Invalid password" });
        }
        const token = createTokenForUser(user);
        // console.log("token: ", token);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        console.error("Error: ", error);
        return res.render('signin', { error: "Incorrect email or password" });
    }
};

function logoutUser(req, res) {
    try {
        res.clearCookie("token").redirect("/");
    } catch (error) {
        console.error("Error: ", error);
        return res.render('signin', { error: "Incorrect email or password" });
    }
}


module.exports = {
    signUpUser,
    signInUser,
    logoutUser
}