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
            const  task = await Tasks.findByPk(req.params.id)
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

}