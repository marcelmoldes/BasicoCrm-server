'use strict';
const { faker } = require("@faker-js/faker");
const {Op} = require("sequelize");
const {taskStatusOptions} = require("../lib/options");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const objectsToCreate = 100;
        const records = [];
        for (let i = 0; i < objectsToCreate; i++) {
            let user_id = faker.number.int({ min: 1, max: 1});
            let contact_id = faker.number.int({ min: 1, max: 100 });
            let deal_id= faker.number.int({ min: 1, max: 100 });
            let account_id = faker.number.int({ min: 1, max: 100 });
            let name  = faker.lorem.word(10);
            let description  = faker.lorem.paragraph(2);
            let due_date  = faker.date.anytime();
            let status  = taskStatusOptions[Math.round(Math.random() * (taskStatusOptions.length-1))].value;
            let priority  =faker.word.adjective(5);

            const created_at = faker.date.past({
                days: 365,
            });
            const task = {
                user_id,
                contact_id,
                deal_id,
                name,
                account_id,
                description,
                due_date,
                status,
                priority,
                created_at: created_at,
                updated_at: created_at
            };
            records.push(task);
        }
        await queryInterface.bulkInsert('tasks', records, {});
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', {id: {[Op.gt]: 0}}, { restartIdentity: true });
  }
};


