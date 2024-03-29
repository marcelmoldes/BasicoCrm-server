const privateGuard = require('../guards/privateGuard')
const ListConfigsService = require('../services/listconfigsService.js')
const listconfigValidatorSchema = require('../validators/listconfigsValidator');
const { handleJoiErrors } = require("../helpers/validationHelper");

const Joi = require('joi');
module.exports = {
    async create(req, res) {
        try {
            const { tenant_id } = await privateGuard(req)
            try {
                const validator = Joi.object(listconfigValidatorSchema);
                Joi.assert(req.body, validator, { abortEarly: false });
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }
            req.body.tenant_id = tenant_id;
            const listconfig = await ListConfigsService.create(req.body);
            return res.send({
                success: true,
                listconfig,
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
            const result = await ListConfigsService.findAll(req.query);
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
            const listconfig = await ListConfigsService.findByPk(req.params.id)
            return res.send({
                success: true,
                listconfig
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
                const validator = Joi.object(listconfigValidatorSchema);
                Joi.assert(req.body, validator, { abortEarly: false });
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }
            const listconfig = await ListConfigsService.update(req.body, req.params.id);
            return res.send({
                success: true,
                listconfig
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
            await ListConfigsService.remove(req.params.id);
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
