const { faker } = require('@faker-js/faker')
const { Admin } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Admin.deleteMany();
        for(let i = 0; i < count; i++) {
            await Admin.create({
                name: faker.name.fullName(),
                email: faker.internet.email(),
                password: '123456'
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}