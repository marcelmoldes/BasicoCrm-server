'use strict';
const {faker} = require("@faker-js/faker");
const {Op} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const objectsToCreate = 100;
        const records = [];
        for (let i = 0; i < objectsToCreate; i++) {
            let account_id, contact_id, tenant_id;
            if(i % 3 === 2) {
                account_id = i;
            } else if(i % 3 === 1) {
                contact_id = i;
            } else {
                tenant_id = i;
            }
            let country_code = faker.location.countryCode()
            let number = faker.string.numeric({
                allowLeadingZeros: false,
                length: 9,
            })
            const created_at = faker.date.past({
                days: 365,
            });
            const phone_number = {
                account_id,
                contact_id,
                tenant_id,
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
