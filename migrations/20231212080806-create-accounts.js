'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      owner_id: {
        type: Sequelize.INTEGER
      },
      phone_id: {
        type: Sequelize.INTEGER
      },
      website: {
        type: Sequelize.STRING
      },

      industry: {
        type: Sequelize.STRING
      },
      annual_revenue: {
        type: Sequelize.DECIMAL
      },
      employees: {
        type: Sequelize.DECIMAL
      },
      notes: {
        type: Sequelize.STRING
      },
      address_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};