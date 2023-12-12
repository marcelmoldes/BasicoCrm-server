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
            let deal_id = faker.number.int({min: 1, max: 100});
            let account_id = faker.number.int({min: 1, max: 100});
            let contact_id = faker.number.int({min: 1, max: 100});

            const created_at = faker.date.past({
                days: 365,
            });
            const attachment = {
                name,
                deal_id,
                account_id,
                contact_id,
                created_at: created_at,
                updated_at: created_at
            };
            records.push(attachment);
        }
        await queryInterface.bulkInsert('attachments', records, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('attachments', {id: {[Op.gt]: 0}}, {restartIdentity: true});
    }
};
