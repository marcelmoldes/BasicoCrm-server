const {ListConfigs,Tenants} = require("../models");
const {paginator} = require("../helpers/databaseHelper");

const include = [Tenants]

module.exports = {

    async create(data) {
        return await ListConfigs.create(data)
    },
    async findOne(options) {
        options.include = include;
        return await ListConfigs.findOne(options);
    },
    async findAll(query) {
        return await paginator(ListConfigs, query, ['field', 'value'],{
            include
        });
    },
    async findByPk(id) {
        return await ListConfigs.findByPk(id,{
            include
        });
    },

    async update(data, id) {
        const listconfig = await ListConfigs.findByPk(id);
        Object.assign(listconfig, data)
        return await listconfig.save()
    },
    async remove(id) {
        const listconfig = await this.findByPk(id);
        if (!listconfig) {
            throw new Error("List Config not found.");
        }
        await ListConfigs.destroy({
            where: {
                id
            }
        });
    }
}