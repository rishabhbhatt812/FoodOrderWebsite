const  express = require("express");
const router = express.Router()
const User = require("../models/User")
const {body , validationResult} =require('express-validator');


const bcrypt = require("bcryptjs");

router.post("/Signup",
  [ body('email').isEmail(),
    body('name').isLength({min:5}).isAlpha(),
    body('password').isLength({min:5})
  ],
  async(req, resp)=>{
     
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return resp.status(400).json({errors:errors.array()});
    }
    
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt)
    try {
     await User.create({
        name:req.body.name,
        password:securePassword,
        email:req.body.email,
        location:req.body.location
      })
    
      resp.json({success:true})
    } catch (error) {
      console.log(error);
      resp.json({success:false})
    }
})

module.exports = router ;