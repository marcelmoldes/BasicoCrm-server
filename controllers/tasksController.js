const privateGuard = require('../guards/privateGuard')
const TasksService = require('../services/tasksService.js')

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)
            const task = await TasksService.create(req.body);
            return res.send({
                success: true,
                task,
            });
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

    async findAll(req, res) {
        try {
            await privateGuard(req)
                const tasks = await TasksService.findAll();
            return res.send({
                success: true,
                tasks
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

    async findOne(req, res) {
        try {
            await privateGuard(req)
            const task = await TasksService.findByPk(req.params.id)
            return res.send({
                success: true,
                task
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

    async update(req, res) {
        try {
            await privateGuard(req)
            const task = await TasksService.update(req.body, req.params.id);
            return res.send({
                success: true,
                task
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },
    async remove(req, res) {
        try {
            await privateGuard(req)
            await TasksService.remove(req.params.id);
            return res.send({
                success: true
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },
};
