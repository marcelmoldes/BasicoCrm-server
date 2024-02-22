const {Tasks, Contacts, Accounts, Deals, Users} = require("../models");
const {paginator} = require("../helpers/databaseHelper");

const {QueryTypes, Sequelize} = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const sequelize = new Sequelize("basico_crm", config.username, config.password, {
    host: config.host,
    dialect: "mysql",
});

const include = [
    {
        model: Accounts,
        include: Users
    },
    {
        model: Deals,
        include: [Users, Accounts]
    },
    {
        model: Contacts,
        include: Users,
    },
    Users,
];

module.exports = {
    async create(data) {
        return await Tasks.create(data)
    },
    async getKpis(tenant_id) {
        const tasks = await sequelize.query(`SELECT count(*) as count FROM tasks  WHERE tenant_id = '${tenant_id}' AND status != 'complete'`, {type: QueryTypes.SELECT});
        return tasks[0].count
    },
    async findOne(options) {
        options.include = include;
        return await Tasks.findOne(options);
    },
    async findAll(query) {
        return await paginator(Tasks, query, ['name', 'due_date', 'status', 'priority'], {
            include
        });
    },
    async findByPk(id) {
        return await Tasks.findByPk(id, {
            include
        });
    },

    async update(data, id) {
        const task = await Tasks.findByPk(id);
        Object.assign(task, data)
        return await task.save()
    },
    async remove(id) {
        const task = await this.findByPk(id);
        if (!task) {
            throw new Error("Task not found.");
        }
        await Tasks.destroy({
            where: {
                id
            }
        });
    }
}