const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { Job, Company } = require("../models");

const index = async (req, res) => {
    const query = (req.user.role === 'company') ? { postedByCompany = req.user.id } : {};
    await Job.find(query).then(items => {
        res.status(200).json(items);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = async (req, res) => {
    await Job.create({
        title: req.body.name,
        description: req.body.email,
        locations: req.body.password,
        minExperience: req.body.description,
        postedByCompany: req.user.id,
        tags: req.body.tags,
        type: req.body.type,
        status: req.body.status,
        isEnabled: true
    }).then(data => {
        res.status(201).json(data);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = async (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    const query = (req.user.role === 'company') ? { postedByCompany = req.user.id, _id: req.params.id  } : { _id: req.params.id };
    await Job.findOne(query).then(data => {
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
    const query = (req.user.role === 'company') ? { postedByCompany = req.user.id, _id: req.params.id  } : { _id: req.params.id };
    await Job.findOne(query).then(data => {
        if(data) {
            if(req.body.title) data.title = req.body.title;
            if(req.body.description) data.description = req.body.description;
            if(req.body.location) data.location = req.body.location;
            if(req.body.minExperience) data.minExperience = req.body.minExperience;
            if(req.body.tags) data.tags = req.body.tags;
            if(req.body.type) data.type = req.body.type;
            if(req.body.status) data.status = req.body.status;
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
    const query = (req.user.role === 'company') ? { postedByCompany = req.user.id, _id: req.params.id  } : { _id: req.params.id };
    Job.findOne(query).then(data => {
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

const apply = (req, res) => {
    if(!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    const query = { _id: req.params.id };
    await Job.findOne(query).then(data => {
        if(data) {
            if(data.studentsApplied.includes(req.user.id)) {
                handleBadRequestResponse(res, 'You have already applied for this job');
            }
            else {
                data.studentsApplied.push(req.user.id);
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
    destroy: destroy,
    apply: apply
}