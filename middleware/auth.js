const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-access-token');

    // check if not token and return a no authorization message
    if (!token) {
        return res.status(401).json({ msg: "No token, Authorization denied" });
    }

    // Verify token
    try {
        // set the token value to decoded variable, passing the token value and config to jwt verify method
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // assign current user
        req.user = decoded.user;
        // call the next method when above code runs successfully
        next();
    } catch (error) {
        res.send(401).json({ message: "Token is not valid" });
    }
};