const {Addresses} = require("../models");
module.exports = {

    async create(data) {
     return await Addresses.create(data)
    },
    async findOne(options) {
        return await Addresses.findOne(options);
    },
    async findAll(options) {
        return await Addresses.findAll(options);
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