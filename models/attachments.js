'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attachments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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