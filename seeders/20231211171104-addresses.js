

'use strict';
const {faker} = require("@faker-js/faker");
const {Op} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const objectsToCreate = 100;
        const records = [];
        for (let i = 0; i < objectsToCreate; i++) {
            let account_id, contact_id, tenant_id;
            if(i % 3 === 2) {
                account_id = i;
            } else if(i % 3 === 1) {
                contact_id = i;
            } else {
                tenant_id = i;
            }
            let street_address1 = faker.location.streetAddress()
            let street_address2 = faker.location.streetAddress()
            let city = faker.location.city()
            let country = faker.location.country()
            let state = faker.location.state()

            const created_at = faker.date.past({
                days: 365,
            });
            const address = {
                account_id,
                contact_id,
                tenant_id,
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
