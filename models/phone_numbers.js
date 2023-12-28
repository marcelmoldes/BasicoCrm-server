'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhoneNumbers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Accounts);
    }
  }
  PhoneNumbers.init({
    contact_id: DataTypes.INTEGER,
    tenant_id: DataTypes.INTEGER,
    account_id: DataTypes.INTEGER,
    country_code: DataTypes.STRING,
    number: DataTypes.DECIMAL(14),
  }, {
    sequelize,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'PhoneNumbers',
  });
  return PhoneNumbers;
};