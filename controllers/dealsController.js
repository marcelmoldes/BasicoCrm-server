const privateGuard = require('../guards/privateGuard')
const DealsService = require('../services/dealsService.js')

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)
            const deal = await DealsService.create(req.body);
            return res.send({
                success: true,
                deal,
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
            const deals = await DealsService.findAll();
            return res.send({
                success: true,
                deals
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
            const deals = await DealsService.findByPk(req.params.id)
            return res.send({
                success: true,
                deals
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
            const deal = await DealsService.update(req.body, req.params.id);
            return res.send({
                success: true,
                deal
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
            await DealsService.remove(req.params.id);
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
