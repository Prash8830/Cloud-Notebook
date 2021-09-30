const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
//create a user using:  POST"/api/auth".Does not require authentication
router.get('/', [
   body('name',' enter a valid name ').isLength({ min: 3 }),
   body('email',' enter a valid email').isEmail(),
   body('password').isLength({ min: 8 }),
], (req, res) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
       name: req.body.name,
       password: req.body.password,
       email: req.body.email,
    }).then(user => {res.json(user)})
    .catch(err =>{console.log(err)
   res.json({error:"pleas enter a unique value for email id",message:err.message})});
   // res.send(req.body);
})

module.exports = router