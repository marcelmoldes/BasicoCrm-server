'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contacts.init({
    accountId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    title: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneId: DataTypes.INTEGER,
    leadSource: DataTypes.STRING(40),
    website: DataTypes.STRING(100),
    annualRevenue: DataTypes.DECIMAL(15),
    leadStatus: DataTypes.STRING(40),
    industry: DataTypes.STRING(40),
    notes: DataTypes.STRING,
    isLead: DataTypes.BOOL,
  }, {
    sequelize,
    modelName: 'Contacts',
  });
  return Contacts;
};