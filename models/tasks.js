'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tasks.init({
    contactId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    dealId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    dueDate: DataTypes.DATETIME,
    status: DataTypes.STRING,
    priority: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};