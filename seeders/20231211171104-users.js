'use strict';
const { faker } = require("@faker-js/faker");
const {Op} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const objectsToCreate = 100;
        const records = [];
        for (let i = 0; i < objectsToCreate; i++) {
            let email = faker.internet.email();
            let first_name = faker.person.firstName();
            let last_name = faker.person.lastName();
            let profile_image =
                "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg";
            let role = "user";
            if (i === 0) {
                first_name = "John";
                last_name = "Doe";
                email = "john.doe@acme.com";
                role = "admin";
                profile_image =
                    "https://t3.ftcdn.net/jpg/04/60/91/88/360_F_460918802_XVCymFr7MoziFpnInbTDvrlblYhvAOi2.jpg";
            }
            const created_at = faker.date.past({
                days: 365,
            });
            const user = {
                tenant_id: 1,
                first_name,
                last_name,
                email,
                password: "12345",
                profile_image: profile_image,
                role,
                created_at: created_at,
                updated_at: created_at
            };
            records.push(user);
        }
        await queryInterface.bulkInsert('users', records, {});
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {id: {[Op.gt]: 0}}, { restartIdentity: true });
  }
};
