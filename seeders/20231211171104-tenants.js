'use strict';
const { faker } = require("@faker-js/faker");
const {Op} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const objectsToCreate = 100;
        const records = [];
        for (let i = 0; i < objectsToCreate; i++) {
            let owner_id = faker.number.int({ min: 1, max: 1});
            let address_id = faker.number.int({ min: 1, max: 100 });
            let phone_id= faker.number.int({ min: 1, max: 100 });
            let name = faker.company.name();
            let industry  = faker.commerce.department()
            let annual_revenue  = faker.commerce.price({ min: 20000, max: 1000000 })
            let employees  = faker.string.numeric(5)
            let website  = faker.internet.url();
            let type  = faker.person.jobType()

            const created_at = faker.date.past({
                days: 365,
            });
            const tenant = {
                owner_id,
                address_id,
                phone_id,
                name,
                type,
                website,
                industry,
                annual_revenue,
                employees,
                created_at: created_at,
                updated_at: created_at
            };
            records.push(tenant);
        }
        await queryInterface.bulkInsert('tenants', records, {});
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tenants', {id: {[Op.gt]: 0}}, { restartIdentity: true });
  }
};
