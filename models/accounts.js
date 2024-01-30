'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {

    static associate(models) {
      this.hasOne(models.PhoneNumbers);
      this.hasOne(models.Addresses);
      this.hasMany(models.Tasks)
      this.hasMany(models.Activities);
      this.hasMany(models.Attachments);
      this.hasMany(models.Deals);
      this.belongsTo(models.Users);
      this.hasOne(models.Contacts);
    }
  }
  Accounts.init({
    tenant_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
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