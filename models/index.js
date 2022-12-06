'use strict';
const company = require("./company");
const job = require("./job");
const student = require("./student");
const admin = require("./admin");

module.exports = {
    Admin: admin,
    Company: company,
    Student: student,
    Job: job,
}