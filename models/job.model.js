const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    jobId:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    companyName :{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    sharedBy:{
        type:[mongoose.SchemaType.ObjectId],
        ref:"company",
        required:true
    },
    status:{
        type:String, 
        default:"OPEN"
    },
    description:{
        type:String
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
const userModel = mongoose.model('jons',jobSchema);
module.exports = userModel;