const {Deals} = require("../models");
module.exports = {

    async create(data) {
     return await Deals.create(data)
    },
    async findOne(options) {
        return await Deals.findOne(options);
    },
    async findAll(options) {
        return await Deals.findAll(options);
    },
    async findByPk(id) {
        return await Deals.findByPk(id);
    },

    async update(data, id) {
        const deal = await Deals.findByPk(id);
        Object.assign(deal, data)
        return await deal.save()
    },
    async remove(id) {
        const deal = await this.findByPk(id);
        if (!deal) {
            throw new Error("Deal not found.");
        }
        await Deals.destroy({
            where: {
                id
            }
        });
    }
}