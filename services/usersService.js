const {Users, Activities, Contacts, Tasks, Deals, Accounts, Tenants} = require("../models");
const {paginator} = require("../helpers/databaseHelper");
const bcrypt = require("bcrypt");
const {password} = require("../validators/usersValidator");

const include = [
    Contacts,
    Tasks,
    Deals,
    Accounts,
    Tenants,
    Activities
];

module.exports = {
    async create(data) {
        const emailFound = await this.findByEmail(data.email)
        if (emailFound) {
            throw new Error("User already exists")
        } else {
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10)
            }
            return await Users.create(data);
        }
    },
    async findOne(options) {
        options.include = include;
        return await Users.findOne(options);
    },
    async findAll(query) {
        return await paginator(Users, query, {
            include
        });
    },
    async findByPk(id) {
        return await Users.findByPk(id, {
            include
        });
    },
    async findByEmail(email) {
        return await Users.findOne({
            where: {
                email
            },
        });
    },
    async update(data, id) {
        const user = await Users.findByPk(id);
        Object.assign(user, data)
        return await user.save()
    },
    async changePassword(password, id) {
        password = await bcrypt.hash(password, 10)
        return this.update({
            password
        }, id)
    },


    async remove(id) {
        const user = await this.findByPk(id);
        if (!user) {
            throw new Error("User not found.");
        }
        await Users.destroy({
            where: {
                id
            }
        });
    }
}