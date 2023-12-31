'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attachments extends Model {
    static associate(models) {
      this.belongsTo(models.Accounts);
      this.belongsTo(models.Contacts);
      this.belongsTo(models.Deals);
    }
  }
  Attachments.init({
    name: DataTypes.STRING(50),
    path: DataTypes.STRING(200),
    deal_id: DataTypes.INTEGER,
    account_id: DataTypes.INTEGER,
    contact_id: DataTypes.INTEGER,
  }, {
    sequelize,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Attachments',
  });
  return Attachments;
};