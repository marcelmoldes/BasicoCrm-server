const {Contacts, Users, Deals} = require('../models')

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
            const contact = await Contacts.findByPk(req.params.id)
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
    async removeContact(req, res) {
        try {
            const contactFound = await Contacts.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!contactFound) {
                return res.send({
                    success: false,
                    error: "Contact not found"
                })
            }
            const removeContact = await Contacts.destroy({
                where: {
                    id: req.params.id
                }
            });
            return res.send({
                success: true,
                removeContact
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

    async updateContact(req, res) {
        try {
            const contact = await Contacts.findByPk(req.params.id)

            contact.first_name = req.body.first_name
            contact.last_name = req.body.last_name
            contact.title = req.body.title
            contact.email = req.body.email
            contact.lead_source = req.body.lead_source
            contact.website = req.body.website
            contact.annual_revenue = req.body.annual_revenue
            contact.lead_status = req.body.lead_status
            contact.industry = req.body.industry
            contact.notes = req.body.notes
            contact.is_lead = req.body.is_lead
            await contact.save()
            return res.send({
                success: true,
                contact
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            })
        }

    }
    }