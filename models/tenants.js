'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tenants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tenants.init({
    "ownerId": DataTypes.INTEGER,
    "addressId": DataTypes.INTEGER,
    "phoneId": DataTypes.INTEGER,
    "name": DataTypes.STRING(40),
    "website": DataTypes.STRING(250),
    "type": DataTypes.STRING(20),
    "industry": DataTypes.STRING(40),
    "annualRevenue": DataTypes.DECIMAL(15),
    "employees": DataTypes.DECIMAL(10),

  }, {
    sequelize,
    modelName: 'Tenants',
  });
  return Tenants;
};