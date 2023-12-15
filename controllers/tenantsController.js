const privateGuard = require('../guards/privateGuard')
const TenantsService = require('../services/tenantsService.js')

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)
            const tenant = await TenantsService.create(req.body);
            return res.send({
                success: true,
                tenant,
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
            const tenants = await TenantsService.findAll();
            return res.send({
                success: true,
                tenants
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
            const tenant = await TenantsService.findByPk(req.params.id)
            return res.send({
                success: true,
            tenant
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
            const tenant = await TenantsService.update(req.body, req.params.id);
            return res.send({
                success: true,
                tenant
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
            await TenantsService.remove(req.params.id);
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
