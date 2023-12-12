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
      account_id: {
        type: Sequelize.INTEGER
      },
      owner_id: {
        type: Sequelize.INTEGER
      },
      address_id: {
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone_id: {
        type: Sequelize.INTEGER
      },
      lead_source: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      annual_revenue: {
        type: Sequelize.DECIMAL
      },
      lead_status: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      is_lead: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('contacts');
  }
};