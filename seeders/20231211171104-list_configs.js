

'use strict';
const {faker} = require("@faker-js/faker");
const {Op} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const objectsToCreate = 100;
        const records = [];
        for (let i = 0; i < objectsToCreate; i++) {
            let tenant_id = faker.number.int({ min: 1, max: 100 })
            let value = faker.string.numeric(5)
            let field =faker.word.adjective(5)

            const created_at = faker.date.past({
                days: 365,
            });
            const list_config = {
                tenant_id,
                value,
                field,

                created_at: created_at,
                updated_at: created_at
            };
            records.push(list_config);
        }
        await queryInterface.bulkInsert('list_configs', records, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('list_configs', {id: {[Op.gt]: 0}}, {restartIdentity: true});
    }
};
