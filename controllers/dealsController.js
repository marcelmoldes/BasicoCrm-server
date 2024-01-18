const privateGuard = require('../guards/privateGuard')
const DealsService = require('../services/dealsService.js')
const dealValidatorSchema = require('../validators/dealsValidator');
const { handleJoiErrors } = require("../helpers/validationHelper");
const Joi = require('joi');
const ContactsService = require("../services/contactsService");
const AccountsService = require("../services/accountsService");
const UsersService = require("../services/usersService");

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
            const deal = await DealsService.findByPk(req.params.id)
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
    async getOptions(req, res) {
        try {
            await privateGuard(req)
            const options = {

                accounts: (await AccountsService.findAll({
                    recordsPerPage: 10000,
                    sortBy: 'name',
                    sortOrder: 'asc',
                }))['records'],
                users: (await UsersService.findAll({
                    recordsPerPage: 10000,
                    sortBy: 'first_name',
                    sortOrder: 'asc',
                }))['records'],
                status: [{
                    label: 'Pending',
                    value: 'pending'
                }, {
                    label: 'In progress',
                    value: 'in_progress'
                }, {
                    label: 'Complete',
                    value: 'complete',
                }],
            }

            return res.send({
                success: true,
                options
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });

        }

    }
};
