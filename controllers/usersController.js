const adminGuard = require('../guards/adminGuard')
const UsersService = require('../services/usersService.js')

module.exports = {
    async create(req, res) {
        try {
            await adminGuard(req)
            const user = await UsersService.create(req.body);
            return res.send({
                success: true,
                user,
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
            await adminGuard(req)
            const users = await UsersService.findAll();
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
};
