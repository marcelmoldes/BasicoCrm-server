'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable('deals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING
      },
      account_id: {
        type: Sequelize.STRING
      },
      deal_name: {
        type: Sequelize.STRING
      },

      deal_value: {
        type: Sequelize.DECIMAL
      },

      status: {
        type: Sequelize.STRING
      },

      close_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('deals');
  }
};