const Admin = require('./models/admin');
const Company = require('./models/company');
const Student = require('./models/student');
const Job = require('./models/job');

exports.adminData= async(req,res)=>{
    await Admin.create({
        firstName:"vinay",
        lastName:"yadav",
        id:"213",
        email:"vinay@gmail.com",
        password:"12345678",
    })
}
exports.companyData= async(req,res)=>{
    await Company.create({
        Name:"ABC.P",
        description:"IT company",
        contact:"9807654321",
        address:"Lucknow",
        email:"abc@gmail.com",
        password:"12345678"
    })
}
exports.studentData= async(req,res)=>{
    await Student.create({
        firstName:"vimal",
        lastName:"patel",
        id:"123",
        email:"vim22al@gmail.com",
        password:"12345678"
    })
}
exports.jobData= async(req,res)=>{
    await Job.create({
        name:"backend development",
        jobId:"ABC-33",
        description:"IT job",
        requirement:"12",
        openingData:"01/jan/2023"
    })
}