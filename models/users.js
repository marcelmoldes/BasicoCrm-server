const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            this.hasMany(models.Activities);
            this.hasMany(models.Contacts);
            this.hasMany(models.Accounts);
            this.hasMany(models.Tasks);
            this.hasMany(models.Deals);
            this.hasOne(models.Tenants);
        }
    }

    Users.init({
        tenant_id: DataTypes.INTEGER,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        profile_image: DataTypes.STRING,
        role: DataTypes.STRING,
    }, {
        sequelize,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        modelName: 'Users',
    });
    return Users;
};



