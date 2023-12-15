const {Tenants} = require("../models");
module.exports = {

    async create(data) {
     return await Tenants.create(data)
    },
    async findOne(options) {
        return await Tenants.findOne(options);
    },
    async findAll(options) {
        return await Tenants.findAll(options);
    },
    async findByPk(id) {
        return await Tenants.findByPk(id);
    },

    async update(data, id) {
        const tenant = await Tenants.findByPk(id);
        Object.assign(tenant, data)
        return await tenant.save()
    },
    async remove(id) {
        const tenant = await this.findByPk(id);
        if (!tenant) {
            throw new Error("Tenant not found.");
        }
        await Tenants.destroy({
            where: {
                id
            }
        });
    }
}