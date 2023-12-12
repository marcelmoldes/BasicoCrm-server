'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListConfigs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ListConfigs.init({
    tenantId: DataTypes.INTEGER,
    field: DataTypes.STRING,
    value: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ListConfigs',
  });
  return ListConfigs;
};