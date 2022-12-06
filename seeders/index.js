'use strict';
const adminSeeder = require("./admin.seeder");
const studentSeeder = require("./student.seeder");
const companySeeder = require("./company.seeder");
const jobSeeder = require("./job.seeder");
const { dbConnect } = require("../helpers");

let exitAfterSeeding = false;

module.exports = {
    seedAll: async () => {
        await dbConnect().then(async () => {
            await adminSeeder.seed(1);
            await studentSeeder.seed(10);
            await companySeeder.seed(3);
            await jobSeeder.seed(10);
        }).catch(err => console.log(`Failed to run seeders because:\n${err}`));
        if(exitAfterSeeding) process.exit();
    }
}

if(process.argv.includes('seed')) {
    exitAfterSeeding = true;
    module.exports.seedAll();
}