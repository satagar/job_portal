const { faker } = require('@faker-js/faker')
const { Student } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Student.deleteMany();
        for(let i = 0; i < count; i++) {
            await Student.create({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                birthdate: faker.date.birthdate(),
                experience: faker.datatype.number({ max: 10, min: 0 }),
                resumes: [],
                tags: faker.helpers.uniqueArray(faker.name.jobType, 5),
                isSeeking: faker.datatype.boolean(),
                isEnabled: faker.datatype.boolean(),
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}