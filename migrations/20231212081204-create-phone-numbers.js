'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable('phone_numbers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      countryCode: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.DECIMAL(14)
      },

      createdAt: {

        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('phone_numbers');
  }
};