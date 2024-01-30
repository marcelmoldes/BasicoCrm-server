'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tasks extends Model {
        static associate(models) {
            this.belongsTo(models.Contacts);
            this.belongsTo(models.Accounts);
            this.belongsTo(models.Deals)
            this.belongsTo(models.Users);
        }
    }
    Tasks.init({
        tenant_id: DataTypes.INTEGER,
        contact_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        deal_id: DataTypes.INTEGER,
        account_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        due_date: DataTypes.DATE,
        status: DataTypes.STRING,
        priority: DataTypes.STRING
    }, {
        sequelize,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        modelName: 'Tasks',
    });
    return Tasks;
};