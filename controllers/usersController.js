const {Users} = require('../models')

module.exports = {
    async createUser(req, res) {
        try {
            const emailFound = await Users.findOne({
                where: {
                    email: req.body.email
                },
            });
            const userFound = await Users.findOne({
                where: {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                },
            });

            if (emailFound || userFound) {
                return res.send({
                    success: false,
                    error: "This user already exists!",
                });
            } else {
                const user = await Users.create(req.body);
                return res.send({
                    success: true,
                    user,
                });
            }
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

    async findAllUsers(req, res) {
        try {
            const users = await Users.findAll();
            return res.send({
                success: true,
                users
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

    async findOneUser(req, res) {
        try {
            const user = await Users.findByPk(req.params.id)
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

    async updateUser(req, res) {
        try {


        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },
    async removeUser(req, res) {
        try {

        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },


};
