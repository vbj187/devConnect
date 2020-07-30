const express = require('express');
const router = express.Router();

// middleware for authenticating
const auth = require('../../middleware/auth');
// for validating the req object
const { check, validationResult } = require('express-validator');
// to check document schema
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

/**
*  @route        POST api/posts
*  @desc         Create Post
*  @access       Private
*/
router.post('/',
    [
        // implement auth before every calling the callback function
        // if not authenticated, return with an unauthorized response
        auth,
        // validation
        [
            check('text', 'Text is required').not().isEmpty()
        ]
    ]
    , async (req, res) => {
        // if any errors in validation
        // send error response
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            // assigning the current user to a variable based on user obtained from auth
            const user = await User.findById(req.user.id).select('-password');
            // instantiation of post document schema
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });
            // save the post
            const post = await newPost.save();
            // return post as response
            res.json(post);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });

module.exports = router;