const { faker } = require('@faker-js/faker')
const { Job, Company } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Job.deleteMany();
        for(let i = 0; i < count; i++) {
            await Job.create({
                title: faker.name.jobTitle(),
                description: faker.name.jobDescriptor(),
                location: faker.address.cityName(),
                minExperience: faker.datatype.number({ max: 10, min: 0 }),
                postedByCompany: (await Company.aggregate([{ $sample: { size: 1 } }])).find(() => true),
                applyingStudents: [],
                shortlistedStudents: [],
                tags: faker.helpers.uniqueArray(faker.name.jobType, 5),
                type: faker.helpers.arrayElement(Job.types),
                status: faker.helpers.arrayElement(Job.statuses),
                isEnabled: faker.datatype.boolean()
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}