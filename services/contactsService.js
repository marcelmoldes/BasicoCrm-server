const {Contacts} = require("../models");
module.exports = {

    async create(data) {
     return await Contacts.create(data)
    },
    async findOne(options) {
        return await Contacts.findOne(options);
    },
    async findAll(options) {
        return await Contacts.findAll(options);
    },
    async findByPk(id) {
        return await Contacts.findByPk(id);
    },

    async update(data, id) {
        const contact = await Contacts.findByPk(id);
        Object.assign(contact, data)
        return await contact.save()
    },
    async remove(id) {
        const contact = await this.findByPk(id);
        if (!contact) {
            throw new Error("Contact not found.");
        }
        await Contacts.destroy({
            where: {
                id
            }
        });
    }
}