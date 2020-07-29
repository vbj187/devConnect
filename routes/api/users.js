const express = require('express');
const router = express.Router();

// package that generates a avatar
const gravatar = require('gravatar');

// package to encrypt the password
const bcrypt = require('bcryptjs');

// for validating the request
const { check, validationResult } = require('express-validator');

// importing User model
const User = require('../../models/User');


/**
 * @route        POST api/users
 * @desc         Register User
 * @access       Public
 */
router.post('/',
    // middleware for validating req.body
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password should be with atleast 6 character').isLength({ min: 6 })
    ]
    , async (req, res) => {
        // validationResult(req) returns the validationResult based on criteria 
        // listed in the validation middleware
        const errors = validationResult(req);

        // if validation results are not empty
        // sends an error response
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructure from req.body
        const { name, email, password } = req.body;


        try {
            // Check if the user exists and if so, send an error response
            let user = await User.findOne({ email });
            if (user) {
                res.status(400).json({ error: 'User Already Exists' });
            } else {
                // Get User's gravatar
                const avatar = gravatar.url(email, {
                    // configurations for gravatar, where pg - represents non adult content pictures
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                // instantiate User model to the user to be created
                user = new User({ name, email, avatar, password });

                // Encrypt the password using bcryptjs
                // default of 10 salt rounds is recommended
                const salt = await bcrypt.genSalt(10);
                // creates a has for the password
                user.password = await bcrypt.hash(password, salt);

                // user documented created in DB
                await user.save();

                // Return a JsonWebToken
                res.send(req.body);
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    }
);



module.exports = router;