const {
    Accounts,
    Activities,
    Attachments,
    Contacts,
    Deals,
    PhoneNumbers,
    Tasks,
    Addresses,
    Users
} = require("../models");
const {paginator} = require("../helpers/databaseHelper");
const {Sequelize} = require('sequelize');
const {QueryTypes} = require('sequelize');
const sequelize = new Sequelize("basico_crm", "root", "password", {
    dialect: "mysql",
});

const include = [
    Users,
    PhoneNumbers,
    Addresses,
    {
        model: Deals,
        include: Accounts
    },
    {
        model: Tasks,
        include: [Accounts, Contacts]
    },
    Attachments,
    {
        model: Activities,
        include: Users
    },
    {
        model: Contacts,
        include: Users
    },
];

module.exports = {

    async create(data) {
        return await Accounts.create(data)
    },
    async findOne(options) {
        const account = await Accounts.findOne(options);
        options.include = include;
        return account
    },
    async findAll(query) {
        return await paginator(Accounts, query, ['industry', 'name', 'website'], {
            include
        })
    },
    async findByPk(id) {
        return await Accounts.findByPk(id, {
            include
        });
    },
    async getKpis(tenant_id) {
        const accounts = await sequelize.query("SELECT count(*) as count FROM `accounts` WHERE tenant_id = '${tenant_id}'", {type: QueryTypes.SELECT});
        return accounts[0].count
    },
    async update(data, id) {
        const account = await Accounts.findByPk(id);
        Object.assign(account, data)
        return await account.save()
    },
    async remove(id) {
        const account = await this.findByPk(id);
        if (!account) {
            throw new Error("Account not found.");
        }
        await Accounts.destroy({
            where: {
                id
            }
        });
    }
}