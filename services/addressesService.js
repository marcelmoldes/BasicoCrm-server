const {Addresses} = require("../models");
const {paginator} = require("../helpers/databaseHelper");
module.exports = {

    async create(data) {
     return await Addresses.create(data)
    },
    async findOne(options) {
        return await Addresses.findOne(options);
    },
    async findAll(query) {
        return await paginator(Addresses, query,['street_address1','street_address2','city','state','country','postal_code']);
    },
    async findByPk(id) {
        return await Addresses.findByPk(id);
    },

    async update(data, id) {
        const address = await Addresses.findByPk(id);
        Object.assign(address, data)
        return await address.save()
    },
    async remove(id) {
        const address = await this.findByPk(id);
        if (!address) {
            throw new Error("Address not found.");
        }
        await Addresses.destroy({
            where: {
                id
            }
        });
    }
}