'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Addresses.init({
    streetAddress1: DataTypes.STRING(150),
    streetAddress2: DataTypes.STRING(150),
    state: DataTypes.STRING(60),
    city: DataTypes.STRING(60),
    country:DataTypes.STRING(60),

    postal_code:DataTypes.DECIMAL(4)

  }, {
    sequelize,
    underscored: true,
    modelName: 'Addresses',
  });
  return Addresses;
};