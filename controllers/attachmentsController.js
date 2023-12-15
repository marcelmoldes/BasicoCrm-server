const privateGuard = require('../guards/privateGuard')
const AttachmentsService = require('../services/attachmentsService.js')

module.exports = {
    async create(req, res) {
        try {
            await privateGuard(req)
            const attachment = await AttachmentsService.create(req.body);
            return res.send({
                success: true,
                attachment,
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
            const attachments = await AttachmentsService.findAll();
            return res.send({
                success: true,
                attachments
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
            const attachment = await AttachmentsService.findByPk(req.params.id)
            return res.send({
                success: true,
            attachment
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
            const attachment = await AttachmentsService.update(req.body, req.params.id);
            return res.send({
                success: true,
                attachment
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
            await AttachmentsService.remove(req.params.id);
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
