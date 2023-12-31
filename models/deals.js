'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deals extends Model {

    static associate(models) {
      this.belongsTo(models.Accounts);
      this.hasMany(models.Attachments);
      this.hasMany(models.Activities);
      this.hasMany(models.Tasks);
      this.belongsTo(models.Users)
    }
  }
  Deals.init({
    user_id: DataTypes.INTEGER,
    account_id: DataTypes.INTEGER,
    deal_name: DataTypes.STRING(100),
    deal_value: DataTypes.DECIMAL(15),
    status: DataTypes.STRING,
    close_date: DataTypes.DATE
  }, {
    sequelize,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Deals',
  });
  return Deals;
};