const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');

// for authenticating
const auth = require('../../middleware/auth');

// to check document schema
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// importing request module
const request = require('request');

// importing config module
const config = require('config');

/**
 *  @route        GET api/profile/me
 *  @desc         Get current user's profile
 *  @access       Private
 **/
router.get(
  '/me',
  // implement auth before every calling the callback function
  // if not authenticated, return with an unauthorized response
  auth,
  async (req, res) => {
    try {
      // filter profile based on the user id got from auth
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate('user', ['name', 'avatar']);
      // if the profile doesn't exists, return with a response message
      if (!profile)
        return res
          .status(400)
          .json({ message: 'There is no profile for this user' });

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 *  @route        GET api/profile
 *  @desc         Create or Update User Profile
 *  @access       Private
 **/
router.post(
  '/',
  // array of middleware
  [
    // for authentication
    auth,
    // for validation
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // validation the request
    const errors = validationResult(req);
    // if the validation fails, returns with error response
    if (!errors.isEmpty())
      return res.sendStatus(400).json({ errors: errors.array() });

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Create Profile object
    // need to initialize an empty object because it would throw an error otherwise
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills)
      profileFields.skills = skills.split(',').map((skill) => skill.trim());

    // Create Social Array
    // need to initialize an empty object because it would throw an error otherwise
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      // Check if there is a profile
      let profile = await Profile.findOne({ user: req.user.id });

      // if there is a profile that already exists, update the profile in DB
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          // finds the user based on the id mapped to the request by auth
          { user: req.user.id },
          // $set replaces the fields with the new object created
          { $set: profileFields },
          // to modify the original with the new document
          { new: true }
        );
        return res.json(profile);
      }

      // Create Profile
      // Create an instance of the Profile document
      profile = new Profile(profileFields);
      // save the document that is an instance of "Profile" model to the DB
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 *  @route        GET api/profile
 *  @desc         Get all profiles
 *  @access       Public
 **/
router.get('/', async (req, res) => {
  try {
    // finds all documents in profile collection
    const profiles = await Profile.find()
      // populates every document with the appropriate user's name & gravatar from the user collection matching user id
      .populate('user', ['name', 'avatar']);

    // send all the profiles documents
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 *  @route        GET api/profile/user/:user_id
 *  @desc         Get profile by user_id
 *  @access       Public
 **/
router.get('/user/:user_id', async (req, res) => {
  try {
    // finds the specific document in profile collection for the user_id
    const profile = await Profile.findOne({ user: req.params.user_id })
      // populates every document with the appropriate user's name & gravatar from the user collection matching user id
      .populate('user', ['name', 'avatar']);

    // check if a profile exists for the user and otherwise send an error response
    if (!profile) return res.status(400).json({ message: 'Profile not found' });

    // when successfull, return the profile document
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId')
      return res.status(400).json({ message: 'Profile not found' });

    res.status(500).send('Server Error');
  }
});

/**
 *  @route        PUT api/profile/experience
 *  @desc         Add profile experience
 *  @access       Private
 **/
router.put(
  '/experience',
  // middleware for authentication and validation
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From Date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    // destructure keys from the req body
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    // assign to the object later to be added to the document
    const newExp = { title, company, location, from, to, current, description };

    try {
      // filters the profile based on the authenticated user
      const profile = await Profile.findOne({ user: req.user.id });
      // adds the newEdu object to the education key in the document
      profile.experience.unshift(newExp);
      // saves the document
      await profile.save();
      // returns profile document on success
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(200).send('Server Error');
    }
  }
);

/**
 *  @route        DELETE api/profile/experience/:exp_id
 *  @desc         Delete experience from profile
 *  @access       Private
 **/
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the remove index
    // for every entry in the experience mapped to an array based on the ObjectId, and getting the specific
    // object's index in the experience array using the exp_id
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    // based on the indexOf the experience object, splice it to remove it
    profile.experience.splice(removeIndex, 1);
    // saving the modified document
    await profile.save();
    // return response
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 *  @route        PUT api/profile/education
 *  @desc         Add profile education
 *  @access       Private
 **/
router.put(
  '/education',
  // middleware for authentication and validation
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('from', 'From Date is required').not().isEmpty(),
      check('fieldofstudy', 'From Date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // destructure keys from the req body
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    // assign to the object later to be added to the document
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      // filters the profile based on the authenticated user
      const profile = await Profile.findOne({ user: req.user.id });
      // adds the newEdu object to the education key in the document
      profile.education.unshift(newEdu);
      // saves the document
      await profile.save();
      // returns profile document on success
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(200).send('Server Error');
    }
  }
);

/**
 *  @route        DELETE api/profile/education/:edu_id
 *  @desc         Delete education from profile
 *  @access       Private
 **/
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the remove index
    // for every entry in the education mapped to an array based on the ObjectId, and getting the specific
    // object's index in the education array using the edu_id
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    // based on the indexOf the education object, splice it to remove it
    profile.education.splice(removeIndex, 1);
    // saving the modified document
    await profile.save();
    // return response
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 *  @route        DELETE api/profile
 *  @desc         Delete profile, user and posts
 *  @access       Private
 **/
router.delete('/', auth, async (req, res) => {
  try {
    // Remove users posts
    await Post.deleteMany({ user: req.user.id });

    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove User account
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 *  @route        GET api/profile/github/:username
 *  @desc         Get user repos from GitHub
 *  @access       Public
 **/
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200)
        return res.status(404).json({ message: 'No GitHub profile found' });

      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
