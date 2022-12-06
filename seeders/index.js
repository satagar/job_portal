'use strict';
const userSeeder = require("./user.seeder");
const companySeeder = require("./company.seeder");
const jobSeeder = require("./job.seeder");
const studentSeeder = require("./student.seeder");
const { dbConnect } = require("../helpers");

let exitAfterSeeding = false;

module.exports = {
    seedAll: async () => {
        await dbConnect().then(async () => {
            await userSeeder.seed(1);
            await companySeeder.seed(3);
            await studentSeeder.seed(10);
            await jobSeeder.seed(10);
        }).catch(err => console.log(`Failed to run seeders because:\n${err}`));
        if(exitAfterSeeding) process.exit();
    }
}

if(process.argv.includes('seed')) {
    exitAfterSeeding = true;
    module.exports.seedAll();
}