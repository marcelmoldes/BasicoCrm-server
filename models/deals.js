'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Deals.init({
    ownerId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    dealName: DataTypes.STRING(100),
    dealValue: DataTypes.DECIMAL(15),
    closeDate: DataTypes.DATE,
    status: DataTypes.STRING



  }, {
    sequelize,
    modelName: 'Deals',
  });
  return Deals;
};