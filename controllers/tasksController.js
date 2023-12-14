const {Tasks, Users} = require('../models')

module.exports = {
    async createTask(req, res) {
        try {
            const taskFound = await Tasks.findByPk(req.params.id)
            if (taskFound) {
                return res.send({
                    success: false,
                    error: "This task already exists"
                });


            } else {
                const task = await Tasks.create(req.body)
                return res.send({
                    success: true,
                    task
                })
            }
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            })

        }
    },
    async findAllTasks(req, res) {
        try {
            const tasks = await Tasks.findAll();
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

    async findOneTask(req, res) {
        try {
            const task = await Tasks.findByPk(req.params.id)
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

    async removeTask(req, res) {
        try {
            const taskFound = await Tasks.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!taskFound) {
                return res.send({
                    success: false,
                    error: "Task not found"
                })
            }
            const removeTask = await Tasks.destroy({
                where: {
                    id: req.params.id
                }
            });
            return res.send({
                success: true,
                removeTask
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },
    async updateTask(req, res) {
        try {
            const task = await Tasks.findByPk(req.params.id)
            task.name = req.body.name,
                task.description = req.body.description,
                task.due_date = req.body.due_date,
                task.status = req.body.status,
                task.priority = req.body.priority,
            await task.save()
            return res.send({
                success: true,
                task
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            })
        }
    }


}