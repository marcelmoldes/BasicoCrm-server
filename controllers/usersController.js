const Joi = require('joi');
const adminGuard = require('../guards/privateGuard')
const UsersService = require('../services/usersService.js')
const userValidatorSchema = require('../validators/userValidator');
const { handleJoiErrors } = require("../helpers/validationHelper");
const {userRoleOptions} = require("../lib/options");
const privateGuard = require("../guards/privateGuard");
const AccountsService = require("../services/accountsService");

module.exports = {
    async create(req, res) {
        try {
            const { tenant_id } = await adminGuard(req)

            // Validation logic
            try {
                const validator = Joi.object(userValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false, allowUnknown: true});
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }

            req.body.tenant_id = tenant_id;
            const user = await UsersService.create(req.body);
            return res.send({
                success: true,
                user,
            });
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            });
        }
    },

    async findAll(req, res) {
        try {
            await adminGuard(req)
            const result = await UsersService.findAll(req.query);
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
            await adminGuard(req)
            const user = await UsersService.findByPk(req.params.id)
            return res.send({
                success: true,
                user
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
            await adminGuard(req)
            try {
                delete userValidatorSchema.password;
                const validator = Joi.object(userValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false, allowUnknown: true});
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }
            const user = await UsersService.update(req.body, req.params.id);
            return res.send({
                success: true,
                user
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
            await adminGuard(req)
            await UsersService.remove(req.params.id);
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
            await adminGuard(req)
            const options = {
                role: userRoleOptions,
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
