const privateGuard = require('../guards/privateGuard')
const TasksService = require('../services/tasksService.js')
const taskValidatorSchema = require('../validators/tasksValidator');
const { handleJoiErrors } = require("../helpers/validationHelper");
const Joi = require('joi');
const ContactsService = require("../services/contactsService");
const AccountsService = require("../services/accountsService");
const UsersService = require("../services/usersService");
const DealsService = require("../services/dealsService")
const {taskStatusOptions, taskPriorityOptions} = require("../lib/options");

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)

            try {
                const validator = Joi.object(taskValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false, allowUnknown: true});
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }

            const task = await TasksService.create(req.body);
            return res.send({
                success: true,
                task,
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
            const result = await TasksService.findAll(req.query);
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
            const task = await TasksService.findByPk(req.params.id)
            return res.send({
                success: true,
                task
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
                const validator = Joi.object(taskValidatorSchema);
                Joi.assert(req.body, validator,{abortEarly: false, allowUnknown: true});
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }
            const task = await TasksService.update(req.body, req.params.id);
            return res.send({
                success: true,
                task
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
            await TasksService.remove(req.params.id);
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
                deals: (await DealsService.findAll({
                    recordsPerPage: 10000,
                    sortBy: 'deal_name',
                    sortOrder: 'asc',
                }))['records'],
                status: taskStatusOptions,
                priority: taskPriorityOptions,
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
