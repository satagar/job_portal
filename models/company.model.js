const mongoose = require('mongoose');
const CompanySchema = new mongoose.Schema({
    companyId:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    companyType:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    email:{
        type:String,
        required:true
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
const companyModel = mongoose.model('company',companyModel)
module.exports = companyModel;