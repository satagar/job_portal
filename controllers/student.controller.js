const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { Student } = require("../models");

const index = async (req, res) => {
    await Student.find().then(items => {
        res.status(200).json(items);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = async (req, res) => {
    await Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        birthdate: req.body.birthdate,
        experience: req.body.experience,
        tags: req.body.tags,
        isSeeking: true,
        isEnabled: true
    }).then(data => {
        res.status(201).json(data);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = async (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    await Student.findById(req.params.id).then(data => {
        if(data) {
            res.status(200).json(data);
        }
        else handleNotFoundResponse(res);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const update = async (req, res) => {
    if(!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    await Student.findById(req.params.id).then(data => {
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
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const destroy = (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    if(req.params.id === req.user.id) return handleBadRequestResponse(res, 'Cannot delete Self');
    Student.findById(req.params.id).then(data => {
        if(data) {
            data.deleteOne({ _id: req.params.id }).then(data => {
                res.status(200).json(data);
            }).catch(error => {
                handleServerErrorResponse(res, error);
            });
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

module.exports = {
    index: index,
    create: create,
    read: read,
    update: update,
    destroy: destroy
}