const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function createTokenForUser(user) {
    try {
        const payload = {
            _id: user._id,
            name:user.fullName,
            email: user.email,
            profileImageURL: user.profileImageURL,
            role: user.role
        };
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "2h" });
        return token;
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}

function validateToken(token) {
    try {
        // Verify the token using the secret key and return the payload
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        return payload;
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error: ", error);
        // Re-throw the error to propagate it to the caller
        throw error;
    }
}


module.exports = {
    createTokenForUser,
    validateToken
}