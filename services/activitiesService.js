const {
    Activities, Contacts, Accounts, Deals, Users
} = require("../models");
const {paginator} = require("../helpers/databaseHelper");

const include = [
    Contacts,

   Accounts,

    Deals,

    Users


]


module.exports = {

    async create(data) {
     return await Activities.create(data)
    },
    async findOne(options) {
        options.include = include;
        return await Activities.findOne(options);
    },
    async findAll(query) {
        return await paginator(Activities, query, ['subject', 'location', 'status', 'activity_date'], {
            include
        });
    },
    async findByPk(id) {
        return await Activities.findByPk(id,{
            include
        });
    },

    async update(data, id) {
        const activity = await Activities.findByPk(id);
        Object.assign(activity, data)
        return await activity.save()
    },
    async remove(id) {
        const activity = await this.findByPk(id);
        if (!activity) {
            throw new Error("Activity not found.");
        }
        await Activities.destroy({
            where: {
                id
            }
        });
    }
}