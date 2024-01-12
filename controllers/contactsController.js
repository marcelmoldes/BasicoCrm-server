const privateGuard = require('../guards/privateGuard')
const ContactsService = require('../services/contactsService.js')
const contactValidatorSchema = require('../validators/contactsValidator');
const {handleJoiErrors} = require("../helpers/validationHelper");
const Joi = require('joi');

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)
            try {
                const validator = Joi.object(contactValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false, allowUnknown: true});
            } catch (error) {
                return res.send(handleJoiErrors(error));
            }
            const contact = await ContactsService.create(req.body);
            return res.send({
                success: true,
                contact,

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
            const result = await ContactsService.findAll(req.query);
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
            const contact = await ContactsService.findByPk(req.params.id)
            return res.send({
                success: true,
                contact
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
                const validator = Joi.object(contactValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false, allowUnknown: true});
            } catch (error) {
                return res.send(handleJoiErrors(error));
            }
            const contact = await ContactsService.update(req.body, req.params.id);
            return res.send({
                success: true,
                contact
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
            await ContactsService.remove(req.params.id);
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
