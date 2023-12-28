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
      this.hasOne(models.PhoneNumbers);
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