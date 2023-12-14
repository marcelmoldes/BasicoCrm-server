'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activities.init({
    owner_id: DataTypes.INTEGER,
    contact_id: DataTypes.INTEGER,
    account_id: DataTypes.INTEGER,
    deal_id: DataTypes.INTEGER,
    subject: DataTypes.STRING(100),
    description: DataTypes.STRING,
    activity_date: DataTypes.DATE,
    location: DataTypes.STRING(100),
    status: DataTypes.STRING(40),
    notes: DataTypes.STRING,


  }, {
    sequelize,
    underscored: true,
    modelName: 'Activities',
  });
  return Activities;
};