const privateGuard = require('../guards/privateGuard')
const AddressesService = require('../services/addressesService')

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)
            const address = await AddressesService.create(req.body);
            return res.send({
                success: true,
                address,
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
            const addresses = await AddressesService.findAll();
            return res.send({
                success: true,
                addresses
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
            const address = await AddressesService.findByPk(req.params.id)
            return res.send({
                success: true,
            address
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
            const address = await AddressesService.update(req.body, req.params.id);
            return res.send({
                success: true,
                address
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
            await AddressesService.remove(req.params.id);
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
