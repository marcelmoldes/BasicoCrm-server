const privateGuard = require('../guards/privateGuard')
const DealsService = require('../services/dealsService.js')
const dealValidatorSchema = require('../validators/dealsValidator');
const { handleJoiErrors } = require("../helpers/validationHelper");
const Joi = require('joi');

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)
            try {
                const validator = Joi.object(dealValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false, allowUnknown: true});
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }
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
            const result = await DealsService.findAll(req.query);
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
            try {
                const validator = Joi.object(dealValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false, allowUnknown: true});
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }
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
