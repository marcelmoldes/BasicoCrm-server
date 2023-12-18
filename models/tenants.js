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
    "owner_id": DataTypes.INTEGER,
    "address_id": DataTypes.INTEGER,
    "phone_id": DataTypes.INTEGER,
    "name": DataTypes.STRING(40),
    "website": DataTypes.STRING(250),
    "type": DataTypes.STRING(20),
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