const express = require('express');
const { signUpUser, signInUser } = require('../controllers/user');
const fileUpload = require("../middlewares/fileUpload");

const router = express.Router();

router.get('/signin', (req, res) => {
    return res.render("signin", { error: undefined });
});

router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.post('/signup', signUpUser);
// router.post('/signup', fileUpload.single("profileImage"), signUpUser);
router.post('/signin', signInUser);

module.exports = router;