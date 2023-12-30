'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {

    static associate(models) {
      this.hasOne(models.PhoneNumbers);
      this.hasOne(models.Addresses);
    }
  }
  Accounts.init({
    name: DataTypes.STRING,
    owner_id: DataTypes.INTEGER,
    website: DataTypes.STRING,
    industry: DataTypes.STRING,
    annual_revenue: DataTypes.DECIMAL(6),
    employees: DataTypes.DECIMAL,
    notes: DataTypes.STRING,
  }, {
    sequelize,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Accounts',
  });
  return Accounts;
};