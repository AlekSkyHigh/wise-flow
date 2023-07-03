const { parseToken } = require('../services/userService');


module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (token) {
        try {
            const payload = parseToken(token);
            req.user = payload;
            req.token = token;

             // Set the token as an HTTP-only cookie
             res.cookie('access_token', token, {
                maxAge: 3600000, // 1 hour in milliseconds
                httpOnly: true,
                secure: false // Set to true if using HTTPS in production
            });
            
        } catch (err) {
            return res.status(401).json({ message: 'Invalid authorization token' });
        }
    }

    next();
};