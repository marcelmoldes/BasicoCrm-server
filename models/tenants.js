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
      this.hasOne(models.Addresses);
      this.hasOne(models.PhoneNumbers);
      this.hasMany(models.ListConfigs);
      this.hasOne(models.Users);
    }
  }
  Tenants.init({
    "user_id": DataTypes.INTEGER,
    "name": DataTypes.STRING(40),
    "website": DataTypes.STRING(250),
    "company_name": DataTypes.STRING(20),
    "industry": DataTypes.STRING(40),
    "annual_revenue": DataTypes.DECIMAL(15),
    "employees": DataTypes.DECIMAL(10),

  }, {
    sequelize,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Tenants',
  });
  return Tenants;
};