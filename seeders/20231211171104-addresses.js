

'use strict';
const {faker} = require("@faker-js/faker");
const {Op} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const objectsToCreate = 100;
        const records = [];
        for (let i = 0; i < objectsToCreate; i++) {
            let street_address1 = faker.location.streetAddress()
            let street_address2 = faker.location.streetAddress()
            let city = faker.location.city()
            let country = faker.location.country()
            let state = faker.location.state()

            const created_at = faker.date.past({
                days: 365,
            });
            const address = {
                street_address1,
                street_address2,
                city,
                country,
                state,
                postal_code: faker.location.zipCode(),
                created_at: created_at,
                updated_at: created_at
            };
            records.push(address);
        }
        await queryInterface.bulkInsert('addresses', records, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('addresses', {id: {[Op.gt]: 0}}, {restartIdentity: true});
    }
};
