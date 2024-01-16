const privateGuard = require('../guards/privateGuard')
const ActivitiesService = require('../services/activitiesService.js')
const activityValidatorSchema = require('../validators/activitiesValidator');
const {handleJoiErrors} = require("../helpers/validationHelper");
const Joi = require('joi');
const AccountsService = require("../services/accountsService");
const ContactsService = require("../services/contactsService");
const UsersService = require("../services/usersService");

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)
            try {
                const validator = Joi.object(activityValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false, allowUnknown: true});
            } catch (error) {
                return res.send(handleJoiErrors(error));
            }
            const activity = await ActivitiesService.create(req.body);
            return res.send({
                success: true,
                activity,
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
            const result = await ActivitiesService.findAll(req.query);
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
            const activity = await ActivitiesService.findByPk(req.params.id)
            return res.send({
                success: true,
                activity
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
                const validator = Joi.object(activityValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false, allowUnknown: true});
            } catch (error) {
                return res.send(handleJoiErrors(error));
            }
            const activity = await ActivitiesService.update(req.body, req.params.id);
            return res.send({
                success: true,
                activity
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
            await ActivitiesService.remove(req.params.id);
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
                contacts: (await ContactsService.findAll({
                    recordsPerPage: 10000,
                    sortBy: 'first_name',
                    sortOrder: 'asc',
                }))['records'],
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
