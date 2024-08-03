const  express = require("express");
const Order = require("../models/Orders");
const router = express.Router()


router.post('/orderData', async(req,resp)=>{
  let data = req.body.order_data
 
 let emailId = await Order.findOne({email:req.body.email})
 
 if(emailId === null){
  try{
    await Order.create({
      email:req.body.email,
      order_data:[data],
      order_date:req.body.order_date,
    }).then(()=>{
           resp.json({success:true})
    })
  }catch(error){
    console.log(error.message);
    resp.send("Server Errror", error.message)
  }
 }
  
 else{
  try{
    await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}},{$push:{order_date:req.body.order_data}}).then(()=>{
      resp.json({success:true})
    })
  }catch(error){
    resp.send("Server Error", error.messsage)
  }
 }


})

module.exports = router ;