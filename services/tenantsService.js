const {Tenants} = require("../models");
const {paginator} = require("../helpers/databaseHelper");
module.exports = {

    async create(data) {
     return await Tenants.create(data)
    },
    async findOne(options) {
        return await Tenants.findOne(options);
    },
    async findAll(query) {
        return await paginator(Tenants, query, ['name', 'website','type','industry']);
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