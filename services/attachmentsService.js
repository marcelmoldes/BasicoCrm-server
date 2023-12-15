const {Attachments} = require("../models");
module.exports = {

    async create(data) {
     return await Attachments.create(data)
    },
    async findOne(options) {
        return await Attachments.findOne(options);
    },
    async findAll(options) {
        return await Attachments.findAll(options);
    },
    async findByPk(id) {
        return await Attachments.findByPk(id);
    },

    async update(data, id) {
        const attachments = await Attachments.findByPk(id);
        Object.assign(attachments, data)
        return await attachments.save()
    },
    async remove(id) {
        const activity = await this.findByPk(id);
        if (!activity) {
            throw new Error("Attachment not found.");
        }
        await Attachments.destroy({
            where: {
                id
            }
        });
    }
}