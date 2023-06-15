var mongoose = require('mongoose');
const  Schema = mongoose.Schema;
const  userShema = new Schema({
  name: {
    type: String,
    trim:true
  },
  email: {
    type: String,
    trim:true,
  },
  password: {
    type: String,
    trim:true,
  },
  image:{
    type:String,
    default:null
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
},{timestamps : true});
 
module.exports = mongoose.model('user', userShema);