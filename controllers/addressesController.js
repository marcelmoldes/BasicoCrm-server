const privateGuard = require('../guards/privateGuard')
const AddressesService = require('../services/addressesService')
const addressValidatorSchema = require('../validators/addressesValidator');
const { handleJoiErrors } = require("../helpers/validationHelper");
const Joi = require('joi');

module.exports = {
    async create(req, res) {
        try {
            const { tenant_id } = await privateGuard(req)
            try {
                const validator = Joi.object(addressValidatorSchema);
                Joi.assert(req.body, validator, { abortEarly: false });
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }
            req.body.tenant_id = tenant_id;
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
            const { tenant_id } = await privateGuard(req)
            req.query.tenantId = tenant_id;
            const result = await AddressesService.findAll(req.query);
            return res.send({
                success: true,
                ...result
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
            try {
                const validator = Joi.object(addressValidatorSchema);
                Joi.assert(req.body, validator, { abortEarly: false });
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }
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
