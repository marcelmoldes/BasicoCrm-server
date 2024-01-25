const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const {Users} = require('../models')
const Joi = require("joi");
const userValidatorSchema = require("../validators/userValidator");
const {handleJoiErrors} = require("../helpers/validationHelper");
const UsersService = require("../services/usersService");
const privateGuard = require("../guards/privateGuard");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    async register(req, res) {
        try {
            try {
                const validator = Joi.object(userValidatorSchema);
                Joi.assert(req.body, validator, {abortEarly: false});
            } catch (error) {
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
    async login(req, res) {
        try {
            const user = await Users.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (user) {

                const passwordValid = await bcrypt.compare(req.body.password, user.password)
                if(!passwordValid) {
                    return res.send({
                        success: false,
                        error: "This password or email are incorrect"
                    })
                }
                let token = jwt.sign(user.toJSON(), jwtSecret);
                user.set("password", null);
                return res.send({
                    user: user,
                    token,
                    success: true,
                });
            } else {
                return res.send({
                    success: false,
                    error: "This password or email are incorrect",
                });
            }
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

    async changePassword(req, res) {
        try {
            const user = await privateGuard(req)
            if(!await bcrypt.compare(req.body.currentPassword, user.password)) {
                return res.send({
                    success: false,
                    error: "!You must provide your current password!",
                });
            }
            await UsersService.changePassword(req.body.newPassword, user.id);
            return res.send({
                success: true,
            });
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

    async forgotPassword(req, res) {
        try {
            const emailFound = await Users.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!emailFound) {
                return res.send({
                    success: false,
                    error: "This account does not exist, please try again",
                });
            }
            const new_password = Math.random().toString(36).substring(2, 18);
            user.password = newPassword;
            user.save();
            const data = {
                to: user.email,
                from: "moldesmarcel41@gmail.com",
                templateId: "d-f698d27f8c5f4bc7bf1b4b5c95cc1733",
                personalizations: [
                    {
                        to: [{email: user.email}],
                        dynamic_template_data: {
                            First_Name: user.first_name,
                            Password: user.password,
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
                new_password,
            });
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

};
