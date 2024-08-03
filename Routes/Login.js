const express = require("express");
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const jwtSecret = "Mynameisrishabhbhattiamfromdehradun";

router.post("/Login", [body('email').isEmail()], async (req, resp) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).json({ errors: errors.array() });
  }

  try {
    const email = req.body.email
    let userData = await User.findOne({email})
    if (!userData) {
      return resp.status(400).json({ error: "please Enter valid Details" });
    }
     const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
    if (!pwdCompare) {
      return resp.status(400).json({ error: "please Enter valid Password" });
    }

    const data ={
      user:{
        id:userData.id
      }
    }

    const authToken = jwt.sign(data , jwtSecret)
    return resp.json({ message: "Login Successfull", authToken:authToken  })
  }
  catch (error) {
    console.log(error);
    resp.json({ success: false })
  }
})

module.exports = router;