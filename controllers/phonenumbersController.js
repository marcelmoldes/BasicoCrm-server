const privateGuard = require('../guards/privateGuard')
const PhoneNumbersService = require('../services/phonenumbersService.js')
const phonenumberValidatorSchema = require('../validators/phonenumbersValidator');
const { handleJoiErrors } = require("../helpers/validationHelper");
const Joi = require('joi');

module.exports = {
    async create(req, res) {
        try {
            const { tenant_id } = await privateGuard(req)
            try {
                const validator = Joi.object(phonenumberValidatorSchema);
                Joi.assert(req.body, validator, { abortEarly: false });
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }
            req.body.tenant_id = tenant_id;
            const phonenumber = await PhoneNumbersService.create(req.body);
            return res.send({
                success: true,
                phonenumber,
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
            const result = await PhoneNumbersService.findAll(req.query);
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
            const phonenumber = await PhoneNumbersService.findByPk(req.params.id)
            return res.send({
                success: true,
            phonenumber
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
                const validator = Joi.object(phonenumberValidatorSchema);
                Joi.assert(req.body, validator, { abortEarly: false });
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }
            const phonenumber = await PhoneNumbersService.update(req.body, req.params.id);
            return res.send({
                success: true,
                phonenumber
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
            await PhoneNumbersService.remove(req.params.id);
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
