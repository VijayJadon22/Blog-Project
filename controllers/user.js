const User = require('../models/user');
const bcrypt = require('bcrypt');

async function signUpUser(req, res) {
    try {
        const { fullName, email, password } = req.body;
        // const profileImageURL = "/images" + req.file.filename;
        // await User.create({
        //     fullName,
        //     email,
        //     password,
        //     profileImageURL,
        //     role
        // });
        await User.create({
            fullName,
            email,
            password
        });
        return res.redirect("/");
    } catch (error) {
        console.error("Error: ", error);
    }
};
async function signInUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('signin',{error:"Invalid Creds"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.render('signin',{error:"Invalid Creds"});
        }
        return res.render("home");
    } catch (error) {
        console.error("Error: ", error);
    }
};


module.exports = {
    signUpUser,
    signInUser
}