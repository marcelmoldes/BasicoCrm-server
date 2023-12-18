'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Deals.init({
    owner_id: DataTypes.INTEGER,
    account_id: DataTypes.INTEGER,
    deal_name: DataTypes.STRING(100),
    deal_value: DataTypes.DECIMAL(15),
    close_date: DataTypes.DATE,
    status: DataTypes.STRING



  }, {
    sequelize,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Deals',
  });
  return Deals;
};