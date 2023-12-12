'use strict';
const {faker} = require("@faker-js/faker");
const {Op} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const objectsToCreate = 100;
        const records = [];
        for (let i = 0; i < objectsToCreate; i++) {
            let country_code = faker.location.countryCode()
            let number = faker.string.numeric({
                allowLeadingZeros: false,
                length: 9,
            })

            const created_at = faker.date.past({
                days: 365,
            });
            const phone_number = {
                country_code,
                number,

                created_at: created_at,
                updated_at: created_at
            };
            records.push(phone_number);
        }
        await queryInterface.bulkInsert('phone_numbers', records, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('phone_numbers', {id: {[Op.gt]: 0}}, {restartIdentity: true});
    }
};
