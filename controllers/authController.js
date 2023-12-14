const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const {Users} = require('../models')
module.exports = {

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

};
