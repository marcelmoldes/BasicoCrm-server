'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountId: {
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      addressId: {
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneId: {
        type: Sequelize.INTEGER
      },
      leadSource: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      annualRevenue: {
        type: Sequelize.DECIMAL
      },
      leadStatus: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      isLead: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('contacts');
  }
};