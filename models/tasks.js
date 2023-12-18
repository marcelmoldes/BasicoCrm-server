'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {

  }
  Tasks.init({
    contact_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    deal_id: DataTypes.INTEGER,
    account_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    due_date: DataTypes.DATE,
    status: DataTypes.STRING,
    priority: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Tasks',
  });
  return Tasks;
};