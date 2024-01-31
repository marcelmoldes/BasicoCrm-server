const Joi = require('joi');
const adminGuard = require('../guards/adminGuard')
const UsersService = require('../services/usersService.js')
const usersValidatorSchema = require('../validators/usersValidator');
const { handleJoiErrors } = require("../helpers/validationHelper");
const {userRoleOptions} = require("../lib/options");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    async create(req, res) {
        try {
            const { tenant_id } = await adminGuard(req)
            try {
                const validator = Joi.object(usersValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false, allowUnknown: true});
            } catch(error) {
                return res.send(handleJoiErrors(error));
            }
            req.body.tenant_id = tenant_id;
            const password =  Math.random().toString(36).substring(2, 18);
            const userData = {
                tenant_id: tenant_id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password : password,
                role: req.body.role
            }
            const user = await UsersService.create(userData);
            const data = {
                to: user.email,
                from: "moldesmarcel41@gmail.com",
                subject: "Welcome to BasicoCrm",
                templateId: "d-60ad5a0eb2ff4dd6a4ae2e24af996d82",
                personalizations: [
                    {
                        to: [{email: user.email}],
                        dynamic_template_data: {
                            First_Name: user.first_name,
                            Password: password,
                        },
                    },
                ],
            };
            try {
                const result = await sgMail.send(data);
            } catch (error) {
                console.error(error);
                if (error.response) {
                    console.error(error.response.body);
                }
            }
            return res.send({
                success: true,
                user
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
            const { tenant_id } = await adminGuard(req)
            req.query.tenantId = tenant_id;
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
                delete usersValidatorSchema.password;
                const validator = Joi.object(usersValidatorSchema);
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
