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

/**
*  @route        GET api/posts
*  @desc         Get all Posts
*  @access       Private
**/
router.get('/', auth, async (req, res) => {
    try {
        // find all posts by all users
        const posts = await Post.find().sort({ date: -1 });
        // return all posts as response
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


/**
*  @route        GET api/posts
*  @desc         Get all Posts by ID
*  @access       Private
**/
router.get('/:id', auth, async (req, res) => {
    try {
        // filter based on the id send in request params
        const post = await Post.findById(req.params.id);
        // if there isn't any post found for the id, return an error response
        if (!post) return res.status(404).json({ message: 'Post not found' });
        // on successfully getting the post, send as a response
        res.json(post);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') return res.status(404).json({ message: 'Post not found' });
        res.status(500).send('Server Error');
    }
});


/**
*  @route        DELETE api/posts/:id
*  @desc         Delete a post
*  @access       Private
**/
router.delete('/:id', auth, async (req, res) => {
    try {
        // find all posts by all users
        const post = await Post.findById(req.params.id);

        // Check if the Post exists, and if it doesnt, return a error response
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Check if the user owns the post
        if (post.user.toString() !== req.user.id) return res.status(401).json({ message: 'User not authorized' });

        // If the user owns the post
        // delete the post
        await post.remove();

        // return all posts as response
        res.json({ message: 'Post Removed' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') return res.status(404).json({ message: 'Post not found' });
        res.status(500).send('Server Error');
    }
});

module.exports = router;