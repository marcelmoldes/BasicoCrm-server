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
    account_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    address_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    title: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_id: DataTypes.INTEGER,
    lead_source: DataTypes.STRING(40),
    website: DataTypes.STRING(100),
    annual_revenue: DataTypes.DECIMAL(15),
    lead_status: DataTypes.STRING(40),
    industry: DataTypes.STRING(40),
    notes: DataTypes.STRING,
    is_lead: DataTypes.BOOLEAN,
  }, {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Contacts',
  });
  return Contacts;
};