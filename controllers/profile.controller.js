const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { Student, Company } = require("../models");

const read = async (req, res) => {
    let data = null;
    switch(req.user.role) {
        case 'student':
            data = await Student.findById(req.user.id).catch(error => {
                handleServerErrorResponse(res, error);
            });
            break;
        case 'company':
            data = await Company.findById(req.user.id).catch(error => {
                handleServerErrorResponse(res, error);
            });
            break;
    }
    if(data) res.status(200).json(data);
    else handleNotFoundResponse(res);
}

const update = async (req, res) => {
    switch(req.user.role) {
        case 'student':
            await Student.findById(req.user.id).then(data => {
                if(data) {
                    if(req.body.firstName) data.firstName = req.body.firstName;
                    if(req.body.lastName) data.lastName = req.body.lastName;
                    if(req.body.email) data.email = req.body.email;
                    if(req.body.password) data.password = req.body.password;
                    if(req.body.birthdate) data.birthdate = req.body.birthdate;
                    if(req.body.experience) data.experience = req.body.experience;
                    if(req.body.tags) data.tags = req.body.tags;
                    if(req.body.isSeeking) data.isSeeking = req.body.isSeeking;
                    if(req.body.isEnabled) data.isEnabled = req.body.isEnabled;
                    if(data.isModified()) {
                        data.save().then(data => {
                            res.status(200).json(data);
                        }).catch(error => {
                            handleServerErrorResponse(res, error);
                        });
                    }
                    else {
                        res.status(200).json(data);
                    }
                }
                else {
                    handleNotFoundResponse(res);
                }
            })
            .catch(error => {
                handleServerErrorResponse(res, error);
            });
            break;
        case 'company':
            await Company.findById(req.user.id).then(data => {
                if(data) {
                    if(req.body.name) data.name = req.body.name;
                    if(req.body.email) data.email = req.body.email;
                    if(req.body.password) data.password = req.body.password;
                    if(req.body.description) data.description = req.body.description;
                    if(req.body.locations) data.locations = req.body.locations;
                    if(req.body.isHiring) data.isHiring = req.body.isHiring;
                    if(req.body.isEnabled) data.isEnabled = req.body.isEnabled;
                    if(data.isModified()) {
                        data.save().then(data => {
                            res.status(200).json(data);
                        }).catch(error => {
                            handleServerErrorResponse(res, error);
                        });
                    }
                }
                else {
                    handleNotFoundResponse(res);
                }
            })
            .catch(error => {
                handleServerErrorResponse(res, error);
            });
            break;
    }
}

module.exports = {
    read: read,
    update: update
}