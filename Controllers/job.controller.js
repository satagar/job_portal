const Job = require('../Models/job.model');
const Company = require('../Models/Company.model')



exports.job = async(req, res) => {
    const role = req.params.role;
    jobObj = {
        title: req.body.title,
        description: req.body.description,
        Requirements: req.body.Requirements,
        type: req.body.type,
        status: req.body.status,
        vacancy: req.body.vacancy
    }
    let company;

    try {
        company = await Company.findOne({ userId: userId });

    } catch (error) {
        res.status(500).send({
            message: 'Error Occurred!'
        })
    }
    if (role == "Company") {
        try {
            const job = await Job.create(jobObj)
            job.postedByCompany = company.userId;
            await company.save();
            res.status(200).send(job)

        } catch (error) {
            res.status(500).send({
                message: 'Error Occurred!'
            })
        }

    }
}