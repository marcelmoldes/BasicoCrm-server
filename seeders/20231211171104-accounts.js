'use strict';
const {faker} = require("@faker-js/faker");
const {Op} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const objectsToCreate = 100;
        const records = [];
        for (let i = 0; i < objectsToCreate; i++) {
            let name = faker.lorem.word(20);
            let user_id = faker.number.int({min: 1, max: 100});
            let website = faker.internet.url();
            let industry = faker.person.jobType()
            let annual_revenue = faker.commerce.price({ min: 20000, max: 10000000 })
            let employees =faker.string.numeric(5)
            let notes = faker.lorem.paragraph(2)

            const created_at = faker.date.past({
                days: 365,
            });
            const account = {
                tenant_id: 1,
                name,
                user_id,
                website,
                industry,
                annual_revenue,
                employees,
                notes,
                created_at: created_at,
                updated_at: created_at
            };
            records.push(account);
        }
        await queryInterface.bulkInsert('accounts', records, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('accounts', {id: {[Op.gt]: 0}}, {restartIdentity: true});
    }
};
