const  express = require("express");
const Order = require("../models/Orders");
const router = express.Router()

router.post('/myorderdata', async(req,resp)=>{
   
  try {
    let mydata = await Order.findOne({email:req.body.email})
    resp.json({"orderData": mydata})
    
  } catch (error) {
    resp.send("server Error" , error.message)
  }

})

module.exports = router ;