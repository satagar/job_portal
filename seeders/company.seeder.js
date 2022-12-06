const { faker } = require('@faker-js/faker')
const { Company } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Company.deleteMany();
        for(let i = 0; i < count; i++) {
            await Company.create({
                name: faker.company.name(),
                email: faker.internet.email(),
                password: '123456',
                description: faker.lorem.paragraph(),
                locations: Array(3).fill(null).map(item => item = faker.address.cityName()),
                isHiring: faker.datatype.boolean(),
                isEnabled: faker.datatype.boolean()
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}