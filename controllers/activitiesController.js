const privateGuard = require('../guards/privateGuard')
const ActivitiesService = require('../services/activitiesService.js')
const activityValidatorSchema = require('../validators/activitiesValidator');
const { handleJoiErrors } = require("../helpers/validationHelper");
const Joi = require('joi');

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)
            try {
                const validator = Joi.object(activityValidatorSchema);
                Joi.assert(req.body, validator, { abortEarly: false });
            } catch(error) {
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
                Joi.assert(req.body, validator, { abortEarly: false });
            } catch(error) {
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
};
