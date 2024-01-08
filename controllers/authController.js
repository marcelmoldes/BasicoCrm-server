const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const {Users} = require('../models')
const Joi = require("joi");
const userValidatorSchema = require("../validators/userValidator");
const {handleJoiErrors} = require("../helpers/validationHelper");
const UsersService = require("../services/usersService");
const adminGuard = require("../guards/privateGuard");

module.exports = {
    async register(req, res) {
        try {
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
    async login(req, res) {
        try {
            const user = await Users.findOne({
                where: {
                    email: req.body.email,
                    password: req.body.password,
                },
            });

            if (user) {
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
            await adminGuard(req)
            const userFound = await Users.findByPk(req.params.id);
            if (userFound.password !== req.body.currentPassword) {
                return res.send({
                    success: false,
                    error: "!You must provide your current password!",
                });
            }
            userFound.password = req.body.newPassword;
            await userFound.save();

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

};
