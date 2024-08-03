const mongoose = require("mongoose");

const {Schema} = mongoose ;

const UserSchema = new Schema({
  name:{
    type:String,
    requires:true
    
  },
  location:{
    type:String,
    requires:true
  },
  email:{
    type:String,
    requires:true,
    unique:true
  },
  password:{
     type:String,
     require:true,
     
  }

})


module.exports = mongoose.model('user',UserSchema)