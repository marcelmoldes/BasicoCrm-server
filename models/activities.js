'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {

    static associate(models) {
      this.belongsTo(models.Contacts);
      this.belongsTo(models.Accounts);
      this.belongsTo(models.Deals);
      this.belongsTo(models.Users);
    }
  }
  Activities.init({
    user_id: DataTypes.INTEGER,
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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Activities',
  });
  return Activities;
};