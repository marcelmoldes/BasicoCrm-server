const Joi = require('joi');
const adminGuard = require('../guards/privateGuard')
const UsersService = require('../services/usersService.js')
const userValidatorSchema = require('../validators/userValidator');
const { handleJoiErrors } = require("../helpers/validationHelper");

module.exports = {
    async create(req, res) {
        try {
            await adminGuard(req)

            // Validation logic
            try {
                const validator = Joi.object(userValidatorSchema);
                Joi.assert(req.body, validator, { abortEarly: false });
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }

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

            // Validation logic
            try {
                delete userValidatorSchema.password;
                const validator = Joi.object(userValidatorSchema);
                Joi.assert(req.body, validator, { abortEarly: false });
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }
user
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
};
