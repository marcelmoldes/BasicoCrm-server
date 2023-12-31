'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      contact_id: {
        type: Sequelize.INTEGER
      },
      account_id: {
        type: Sequelize.INTEGER
      },
      deal_id: {
        type: Sequelize.INTEGER
      },
      subject: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      activity_date: {
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('activities');
  }
};