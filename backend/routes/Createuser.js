const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")


router.post(
   '/createuser',
   [
      body('name')
         .notEmpty()
         .custom((value) => {
            if (/\d/.test(value)) {
               throw new Error('Name should not contain digits');
            }
            return true;
         }),

      body('email').isEmail(),

      body('password')
         .custom((value) => {
            if(value.length < 5){
               throw new Error('Password should contain at least 5 character')
            }
            return true;
         })
         .custom((value) => {
            if (!/[!@#$%^&*]/.test(value)) {
               throw new Error('Password must contain at least one symbol (!@#$%^&*)');
            }
            return true;
         }),
   ],
   async (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // console.log(errors.array())
         return res.status(400).json({success : false ,validationError : true , errors: errors.array() });
      }

      let email = req.body.email;
      try {
      let userData =  User.findOne({email})
      if(userData) return res.status(400).json({ success: false ,existError : true ,  errors: " email id is already exist !! pls login" })
       const salt = await bcrypt.genSalt(10);
      let secpass = await bcrypt.hash(req.body.password,salt); // hashing the password so it does not leak in the backend dev

         await User.create({
            name: req.body.name,
            password: secpass,
            email: req.body.email,
            location: req.body.location,
         }).then(res.json({ success: true }));
        
      } catch (error) {
         console.error('Error while making a POST request for creating new user', error);
         res.json({ success: false });
      }
   }
);

module.exports = router;
