const {Contacts} = require('../models')

module.exports = {
    async createContact(req, res) {
        try {
            const contactFound = await Contacts.findByPk(req.params.id)
            if (contactFound) {
                return res.send({
                    success: false,
                    error: "This deal already exists"
                });


            } else {
                const contact = await Contacts.create(req.body)
                return res.send({
                    success: true,
                    contact
                })
            }
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            })

        }
    },
    async findAllContacts(req, res) {
        try {
            const contacts = await Contacts.findAll();
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

    async findOneContact(req, res) {
        try {
            const  contact = await Contacts.findByPk(req.params.id)
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

}