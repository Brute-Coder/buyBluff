const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecString = "thisstringwillmakethemagicfortheclientsecurity"
router.post(
    '/loginuser', [body('email').isEmail(),],
    async (req, res) => {
        // first we should check for validator errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // fetch the data from database
        let email = req.body.email
        try {
            let userData = await User.findOne({ email })
            if (!userData) return res.status(400).json({ success: false ,  errors: " email id does't exist !!" })
            // compare the hashed pass 
            const comparePass = await bcrypt.compare(req.body.password,userData.password)
            if (!comparePass) {
                return res.status(400).json({success: false , errors: " Invalid Password !!" })
            }
            const data = {
                user:{
                    id:userData._id
                }
            }

            const authToken = jwt.sign(data,jwtSecString)

            return res.json({success:true,authToken:authToken})
        } catch (error) {
            console.error('Error while making a POST request for creating existing user', error);
            res.json({ success: false });
        }
    }

)

module.exports = router;