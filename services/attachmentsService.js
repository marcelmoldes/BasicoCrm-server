const {Attachments, Contacts, Accounts} = require("../models");
const {paginator} = require("../helpers/databaseHelper");

const include = [
    Contacts,
    Accounts,
]

module.exports = {
    async create(data) {
        return await Attachments.create(data)
    },
    async findOne(options) {
        options.include = include;
        return await Attachments.findOne(options);
    },
    async findAll(query) {
        return await paginator(Attachments, query, ['name', 'path'], {
            include
        });
    },
    async findByPk(id) {
        return await Attachments.findByPk(id, {
            include
        });
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