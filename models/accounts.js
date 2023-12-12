'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Accounts.init({
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    phoneId: DataTypes.INTEGER,
    website: DataTypes.STRING,
    type: DataTypes.STRING,
    industry: DataTypes.STRING,
    annualRevenue: DataTypes.DECIMAL(6),
    employees: DataTypes.DECIMAL,
    notes: DataTypes.STRING,
    addressId: DataTypes.INTEGER,


  }, {
    sequelize,
    modelName: 'Accounts',
  });
  return Accounts;
};