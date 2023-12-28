const {Accounts} = require("../models");
const {paginator} = require("../helpers/databaseHelper");
module.exports = {

    async create(data) {
     return await Accounts.create(data)
    },
    async findOne(options) {
        return await Accounts.findOne(options);
    },
    async findAll(query) {
        return await paginator(Accounts, query, ['industry','name','website'])
    },
    async findByPk(id) {
        return await Accounts.findByPk(id);
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