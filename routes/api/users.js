const express = require('express');
const router = express.Router();

// for validating the request
const { check, validationResult } = require('express-validator');


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
    , (req, res) => {
        // validationResult(req) returns the validationResult based on criteria 
        // listed in the middleware
        const errors = validationResult(req);

        // if validation results are not empty
        // sends an error response
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        res.send(req.body);
    });



module.exports = router;