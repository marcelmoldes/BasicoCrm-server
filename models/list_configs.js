'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListConfigs extends Model {
    static associate(models) {
      this.belongsTo(models.Tenants);
    }
  }
  ListConfigs.init({
    tenant_id: DataTypes.INTEGER,
    field: DataTypes.STRING,
    value: DataTypes.DECIMAL
  }, {
    sequelize,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'ListConfigs',
  });
  return ListConfigs;
};