'use strict';
const company = require("./company");
const job = require("./job");
const student = require("./student");
const user = require("./user");

module.exports = {
    User: user,
    Company: company,
    Student: student,
    Job: job,
}