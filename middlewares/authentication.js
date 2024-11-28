const { validateToken } = require('../services/authentication')

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next(); //Return to stop further execution
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            next();
        } catch (error) {
            console.error("Error: ", error);
            next();
        }
    }
}

module.exports = {
    checkForAuthenticationCookie,
}