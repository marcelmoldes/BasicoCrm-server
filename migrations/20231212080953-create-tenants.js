'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tenants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      addressId: {
        type: Sequelize.INTEGER
      },
      phoneId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      annualRevenue: {
        type: Sequelize.DECIMAL
      },
      employees: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('tenants');
  }
};