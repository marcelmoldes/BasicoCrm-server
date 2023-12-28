const {Tasks} = require("../models");
const {paginator} = require("../helpers/databaseHelper");
module.exports = {

    async create(data) {
     return await Tasks.create(data)
    },
    async findOne(options) {
        return await Tasks.findOne(options);
    },
    async findAll(query) {
        return await paginator(Tasks, query, ['name','due_date','status','priority']);
    },
    async findByPk(id) {
        return await Tasks.findByPk(id);
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