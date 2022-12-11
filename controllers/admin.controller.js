const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { Admin } = require("../models");

const index = async (req, res) => {
    await Admin.find().then(items => {
        res.status(200).json(items);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = async (req, res) => {
    await Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isEnabled: true
    }).then(data => {
        res.status(201).json(data);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = async (req, res) => {
    if (!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    await Admin.findById(req.params.id).then(data => {
        if (data) {
            res.status(200).json(data);
        }
        else handleNotFoundResponse(res);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const update = async (req, res) => {
    if (!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    try {
        const data = await Admin.findById(req.params.id)
        if (data) {
            if (req.body.name) data.name = req.body.name;
            if (req.body.email) data.email = req.body.email;
            if (req.body.password) data.password = req.body.password;
            if (req.body.isEnabled) data.isEnabled = req.body.isEnabled;
            if (data.isModified()) {
                const savedData = await data.save();
                res.status(200).json(savedData);

            }
            else {
                res.status(200).json(data);
            }
        }
        else {
            handleNotFoundResponse(res);
        }
    } catch (error) {
        handleServerErrorResponse(res, error);
    };
}

const destroy = (req, res) => {
    if (!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    if (req.params.id === req.user.id) return handleBadRequestResponse(res, 'Cannot delete Self');
    Admin.findById(req.params.id).then(data => {
        if (data) {
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