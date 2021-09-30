const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'yisrgoodboaary';

// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', ' enter a valid name ').isLength({ min: 3 }),
  body('email', ' enter a valid email').isEmail(),
  body('password').isLength({ min: 8 }),
], async (req, res) => {
  //if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //check whther user with email exists
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);


    // res.json(user)
    res.json({ authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error occured");
  }
})

//Authentication a user :post login
router.post('/login', [
  body('email', ' enter a valid email').isEmail(),
  body('password', ' enter a non blank password').exists()
], async (req, res) => {
  //if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: "Please enter valid correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ errors: "Please enter valid correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken })
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server Error occured");
  }
})
module.exports = router