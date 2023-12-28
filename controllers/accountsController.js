const privateGuard = require('../guards/privateGuard')
const AccountsService = require('../services/accountsService.js')
const accountValidatorSchema = require('../validators/accountsValidator');
const {handleJoiErrors} = require("../helpers/validationHelper");
const Joi = require("joi");

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)
            try {
                const validator = Joi.object(accountValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false});
            } catch (error) {
                return res.send(handleJoiErrors(error));
            }

            const account = await AccountsService.create(req.body);
            return res.send({
                success: true,
                account,
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
            const result = await AccountsService.findAll(req.query);
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
            const account = await AccountsService.findByPk(req.params.id)
            return res.send({
                success: true,
                account
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
                const validator = Joi.object(accountValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false});
            } catch (error) {
                return res.send(handleJoiErrors(error));
            }


            const account = await AccountsService.update(req.body, req.params.id);
            return res.send({
                success: true,
                account
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
            await AccountsService.remove(req.params.id);
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
