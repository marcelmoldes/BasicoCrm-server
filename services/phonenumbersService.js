const {PhoneNumbers, Contacts, Tenants, Accounts} = require("../models");
const {paginator} = require("../helpers/databaseHelper");

const include = [
    Contacts,
    Tenants,
    Accounts
]

module.exports = {
    async create(data) {
        return PhoneNumbers.create(data)
    },
    async findOne(options) {
        options.include = include;
        return await PhoneNumbers.findOne(options);
    },
    async findAll(query) {
        return await paginator(PhoneNumbers, query, ['country_code', 'number'], {
            include
        });
    },
    async findByPk(id) {
        return await PhoneNumbers.findByPk(id, {
            include
        });
    },

    async update(data, id) {
        const phonenumbers = await this.findByPk(id);
        Object.assign(phonenumbers, data)
        return await phonenumbers.save()
    },
    async remove(id) {
        const phonenumber = await this.findByPk(id);
        if (!phonenumber) {
            throw new Error("Phone number not found.");
        }
        await PhoneNumbers.destroy({
            where: {
                id
            }
        });
    }
}