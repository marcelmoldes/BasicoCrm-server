const {
    Activities, Contacts, Accounts, Deals, Users
} = require("../models");
const {paginator} = require("../helpers/databaseHelper");
const {QueryTypes, Sequelize} = require("sequelize");
const sequelize = new Sequelize("basico_crm", "root", "password", {
    dialect: "mysql",
});

const include = [
    {
        model: Contacts,
        include: Users
    },
    {
        model: Accounts,
        include: Users
    },
    {
        model: Deals,
        include: [Users, Accounts]
    },
    Users,

]


module.exports = {

    async create(data) {
     return await Activities.create(data)
    },
    async getKpis() {
        const activities = await sequelize.query("SELECT count(*) as count FROM `activities`", { type: QueryTypes.SELECT });
        return activities[0].count
    },
    async findOne(options) {
        options.include = include;
        const activity = await Activities.findOne(options);
        activity.completed = activity.completed === 1
        return activity;
    },
    async findAll(query) {
        return await paginator(Activities, query, ['title', 'location', 'completed', 'activity_date'], {
            include
        });
    },
    async findByPk(id) {
        const activity = await Activities.findByPk(id,{
            include
        });
        activity.completed = activity.completed === 1
        return activity;
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