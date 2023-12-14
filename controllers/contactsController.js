const privateGuard = require('../guards/privateGuard')
const ContactsService = require('../services/contactsService.js')

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)
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
            const contacts = await ContactsService.findAll();
            return res.send({
                success: true,
                contacts
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