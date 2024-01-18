const {Accounts, Activities, Attachments,Contacts, Deals, PhoneNumbers, Tasks, Addresses, Users} = require("../models");
const {paginator} = require("../helpers/databaseHelper");

const include = [
    Users,
    PhoneNumbers,
    Addresses,
    Deals,
    Tasks,
    Attachments,
    Activities,
    Contacts,

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