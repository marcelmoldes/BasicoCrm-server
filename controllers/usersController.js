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


};
