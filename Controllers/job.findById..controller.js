const Job = require('../Models/job.model');
const Company = require('../Models/Company.model')
const Student = require('../Models/student.model');

exports.findById = async(req, res) => {
    // const role = req.params.role;

    var students, company;

    try {
        students = await Student.findOne({ userId: req.userId })
        company = await Company.findOne({ userId: req.userId })

        if (students) {
            const findById = await Job.find({ userId: userId });
            //help here
        }

    } catch (error) {
        res.status(500).send({
            message: 'Error Occured!';
        })
    }


}