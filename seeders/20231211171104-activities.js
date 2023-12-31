'use strict';
const {faker} = require("@faker-js/faker");
const {Op} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const objectsToCreate = 100;
        const records = [];
        for (let i = 0; i < objectsToCreate; i++) {
            let user_id = faker.number.int({min: 1, max: 100});
            let contact_id = faker.number.int({min: 1, max: 100});
            let account_id = faker.number.int({min: 1, max: 100});
            let deal_id = faker.number.int({min: 1, max: 100});
            let subject = faker.lorem.word(20);
            let description = faker.lorem.paragraph(2)
            let activity_date = faker.date.anytime()
            let location = faker.location.city()
            let status = faker.lorem.word(20);
            let notes =faker.lorem.paragraph(2)
            const created_at = faker.date.past({
                days: 365,
            });
            const activity = {
                user_id,
                contact_id,
                account_id,
                deal_id,
                subject,
                description,
                activity_date,
                location,
                status,
                notes,

                created_at: created_at,
                updated_at: created_at
            };
            records.push(activity);
        }
        await queryInterface.bulkInsert('activities', records, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('activities', {id: {[Op.gt]: 0}}, {restartIdentity: true});
    }
};
