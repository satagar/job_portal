const Job = require('../Models/job.model');
const Company = require('../Models/Company.model')
const Student = require('../Models/student.model');
const { studentData } = require('../init');

exports.job = async(req, res) => {
    const user = req.params.userId;
    jobObj = {
        title: req.body.title,
        description: req.body.description,
        Requirements: req.body.Requirements,
        type: req.body.type,
        status: req.body.status,
        vacancy: req.body.vacancy
    }

    if (user.role == "Company") {
        try {
            const job = await Job.create(jobObj)
            job.postedByCompany = user.userId
            res.status(200).send(job)

        } catch (error) {
            res.status(500).send({
                message: 'Error Occurred!'
            })
        }

    }
}