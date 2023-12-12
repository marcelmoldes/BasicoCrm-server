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
      // define association here
    }
  }
  PhoneNumbers.init({
    countryCode: DataTypes.STRING,
    number: DataTypes.DECIMAL(14),

  }, {
    sequelize,
    modelName: 'PhoneNumbers',
  });
  return PhoneNumbers;
};