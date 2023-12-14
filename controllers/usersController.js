const {Users, Tasks} = require('../models')
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
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
            const user = await Users.findByPk(req.params.id)
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.email = req.body.email;

            await user.save()
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
    async removeUser(req, res) {
        try {
            const userFound = await Users.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!userFound) {
                return res.send({
                    success: false,
                    error: "User not found"
                })
            }
            const removeUser = await Users.destroy({
                where: {
                    id: req.params.id
                }
            });
            return res.send({
                success: true,
                removeUser
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },


    //async login(req, res) {
    // try {
    //    const user = await Users.findOne({
    //     where: {
    //       email: req.body.email,
    //        password: req.body.password,
    //     },
    // });

    //  if (user) {
    //     let token = jwt.sign(user.toJSON(), jwtSecret);
    //   user.set("password", null);
    //   return res.send({
    //    user:user,
    //      token,
    //     success: true,
    //  });
    //  } else {
    //     return res.send({
    //        success: false,
    //        error: "This password or email are incorrects",
    //    });
    //    }
    //  } catch (error) {
    //  return res.send({
    //       success: false,
    //        error: error.message,
    //     });
    //     }
    //   },

};
