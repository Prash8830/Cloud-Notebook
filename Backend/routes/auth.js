const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
//create a user using:  POST"/api/auth".Does not require authentication
router.get('/', [
   body('name',' enter a valid name ').isLength({ min: 3 }),
   body('email',' enter a valid email').isEmail(),
   body('password').isLength({ min: 8 }),
], async(req, res) => {
   //if there are errors
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whther user with email exists
    try{
    let user = await User.findOne({ email: req.body.email }); 
    if(user)
    {
       return res.status(400).json({ errors: "Sorry User with this email already exists"});
    }
   user = await User.create({
       name: req.body.name,
       password: req.body.password,
       email: req.body.email,
    })
    
   //  .then(user => {res.json(user)})
   //  .catch(err =>{console.log(err)
   // res.json({error:"pleas enter a unique value for email id",message:err.message})});
   // res.send(req.body);
   res.json(user)
   }catch(error){
      console.error(error.message);
      res.status(500).send("Some error occurred we will solve it within a few seconds");
   }
})

module.exports = router