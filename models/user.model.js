const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userId :{ 
        type:String,
        required:true,
        unique:true
},
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
phone:{
    type:Number,
    required:true,
    unique:true
},
address:{
    type:String
},
userType:{
    type:String,
    default:"student"
},
createdAt:{
    type:String,
    immutable:true,
    default:()=>{
        return  Date.now()
    }
},
updatedAt:{
    type:String,
    default:()=>{
        return Date.now()
    }
}
})
const userModel = mongoose.model('users',userSchema);
module.exports = userModel;