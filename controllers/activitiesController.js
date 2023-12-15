const privateGuard = require('../guards/privateGuard')
const ActivitiesService = require('../services/activitiesService.js')

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)
            const activity = await ActivitiesService.create(req.body);
            return res.send({
                success: true,
                activity,
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
            const activities = await ActivitiesService.findAll();
            return res.send({
                success: true,
                activities
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
            const activity = await ActivitiesService.findByPk(req.params.id)
            return res.send({
                success: true,
                activity
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
            const activity = await ActivitiesService.update(req.body, req.params.id);
            return res.send({
                success: true,
                activity
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
            await ActivitiesService.remove(req.params.id);
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
