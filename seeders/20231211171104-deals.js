'use strict';
const {faker} = require("@faker-js/faker");
const {Op} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const objectsToCreate = 100;
        const records = [];
        for (let i = 0; i < objectsToCreate; i++) {
            let owner_id = faker.number.int({ min: 1, max: 100 });
            let account_id = faker.number.int({ min: 1, max: 100 });
            let deal_name = faker.lorem.word(20);
            let close_date = faker.date.anytime();
            let status = i % 2 ? 'new' : 'contacted';
            let deal_value = faker.commerce.price({ min: 20000, max: 10000000 })

            const created_at = faker.date.past({
                days: 365,
            });
            const deal = {
              owner_id,
                account_id,
                deal_name,
                close_date,
                status,
                deal_value,
                created_at: created_at,
                updated_at: created_at
            };
            records.push(deal);
        }
        await queryInterface.bulkInsert('deals', records, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('deals', {id: {[Op.gt]: 0}}, {restartIdentity: true});
    }
};
