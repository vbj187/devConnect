const express = require('express');
const router = express.Router();

// import auth middleware
const auth = require('../../middleware/auth');

// import User model
const User = require('../../models/User');

// package for sessions token
const jwt = require('jsonwebtoken');

// require secretOrPrivate key from config
const config = require('config');

// package to encrypt the password
const bcrypt = require('bcryptjs');

// for validating the request
const { check, validationResult } = require('express-validator');

/**
 *  @route        GET api/auth
 *  @desc         Test route
 *  @access       Public
 **/
router.get('/', auth, async (req, res) => {
  try {
    // assigns user by finding the document from the DB using the userId got from auth middleware
    // select '-string' ignores that specific key from the document
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.send(500).send('Server Error');
  }
});

/**
 *  @route        POST api/auth
 *  @desc         Authenticate user & get token
 *  @access       Public
 **/
router.post(
  '/',
  // middleware for validating req.body
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // validationResult(req) returns the validationResult based on criteria
    // listed in the validation middleware
    const errors = validationResult(req);

    // if validation results are not empty
    // sends an error response
    if (!errors.isEmpty()) {
      return res.sendStatus(400).json({ errors: errors.array() });
    }

    // Destructure from req.body
    const { email, password } = req.body;

    try {
      // Check if the user exists and if so, send an error response
      let user = await User.findOne({ email });
      if (!user)
        return res
          .sendStatus(400)
          .json({ errors: { message: 'Invalid Credentials' } });

      // compare if the hashed password in the DB is matched for the password given entered by the user
      const isMatch = await bcrypt.compare(password, user.password);
      // if not matched, return a response of invalid credentials
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: { message: 'Invalid Credentials' } });
      }
      // Creating a payload to send
      const payload = {
        user: {
          id: user.id,
        },
      };
      // signing a token for session
      jwt.sign(
        // passing the payload
        payload,
        // passing the secret
        config.get('jwtSecret'),
        // setting token expiration time
        { expiresIn: '12h' },
        // callback function that handles the signing
        (err, token) => {
          // sends token if there isn't any error
          if (err) throw err;
          res.send({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
