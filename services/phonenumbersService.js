const {PhoneNumbers} = require("../models");
const {paginator} = require("../helpers/databaseHelper");
module.exports = {

    async create(data) {
        return PhoneNumbers.create(data)
    },
    async findOne(options) {
        return await PhoneNumbers.findOne(options);
    },
    async findAll(query) {
        return await paginator(PhoneNumbers, query, ['country_code', 'number']);
    },
    async findByPk(id) {
        return await PhoneNumbers.findByPk(id);
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