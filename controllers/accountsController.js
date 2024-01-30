const privateGuard = require('../guards/privateGuard')
const AccountsService = require('../services/accountsService.js')
const accountValidatorSchema = require('../validators/accountsValidator');
const {handleJoiErrors} = require("../helpers/validationHelper");
const Joi = require("joi");
const ContactsService = require("../services/contactsService");
const UsersService = require("../services/usersService");
const DealsService = require("../services/dealsService");

module.exports = {
    async create(req, res) {
        try {
            const { tenant_id } = await privateGuard(req)
            try {
                const validator = Joi.object(accountValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false, allowUnknown: true});
            } catch (error) {
                return res.send(handleJoiErrors(error));
            }
            req.body.tenant_id = tenant_id;
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
            const { tenant_id } = await privateGuard(req)
            req.query.tenantId = tenant_id;
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
                Joi.assert(req.body, validator, {abortEarly: false, allowUnknown: true});
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
    async getOptions(req, res) {
        try {
            const { tenant_id } = await privateGuard(req)
            const options = {
                users: (await UsersService.findAll({
                    recordsPerPage: 10000,
                    sortBy: 'first_name',
                    sortOrder: 'asc',
                    tenantId: tenant_id
                }))['records'],
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
