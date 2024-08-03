const  express = require("express");
const router = express.Router()

router.post('/foodData', (req,resp)=>{
  try {
    resp.send([global.food_items , global.food_category])
    
  } catch (error) {
    console.log(error.message);
    resp.send("Server Error");
  }
})

module.exports = router ;