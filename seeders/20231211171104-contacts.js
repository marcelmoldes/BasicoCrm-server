

'use strict';
const {faker} = require("@faker-js/faker");
const {Op} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const objectsToCreate = 100;
        const records = [];
        for (let i = 0; i < objectsToCreate; i++) {
            let account_id = faker.number.int({ min: 1, max: 100 });
            let user_id = faker.number.int({ min: 1, max: 100 });
            let first_name = faker.person.firstName();
            let last_name = faker.person.lastName();
            let title = faker.lorem.word(20);
            let email = faker.internet.email();
            let lead_source = faker.lorem.word(10);
            let website =faker.internet.url();
            let annual_revenue = faker.commerce.price({ min: 20000, max: 1000000})
            let lead_status = faker.lorem.word(20);
            let industry = faker.person.jobType()
            let notes = faker.lorem.paragraph(2)
            let is_lead = faker.datatype.boolean(0.2)

            const created_at = faker.date.past({
                days: 365,
            });
            const contact = {
             account_id,
                user_id,
                first_name,
                last_name,
                title,
                email,
                lead_source,
                website,
                annual_revenue,
                lead_status,
                industry,
                notes,
                is_lead,
                created_at: created_at,
                updated_at: created_at
            };
            records.push(contact);
        }
        await queryInterface.bulkInsert('contacts', records, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('contacts', {id: {[Op.gt]: 0}}, {restartIdentity: true});
    }
};
