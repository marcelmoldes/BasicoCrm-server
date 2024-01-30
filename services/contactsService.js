const {Contacts, Addresses, PhoneNumbers, Tasks, Accounts, Activities, Attachments, Users} = require("../models");
const {paginator} = require("../helpers/databaseHelper");
const AddressesService = require("./addressesService");
const PhoneNumbersService = require("./phonenumbersService");

const include = [
    PhoneNumbers,
    {
        model: Tasks,
        include: [Contacts, Accounts]
    },
    Accounts,
    Activities,
    Attachments,
    Users,
    Addresses
];

module.exports = {
    async create(data) {
        return await Contacts.create(data, {
            include: [{
                model: Addresses
            }, {
                model: PhoneNumbers
            }]
        })
    },
    async findOne(options) {
        options.include = include;
        return await Contacts.findOne(options);
    },
    async findAll(query) {
        return await paginator(Contacts, query, ['first_name', 'last_name', 'email'], {
            include
        });
    },
    async findByPk(id) {
        return await Contacts.findByPk(id, {
            include
        });
    },

    async update(data, id) {
        const {Address, PhoneNumber} = data;
        await AddressesService.update(Address, Address.id);
        await PhoneNumbersService.update(PhoneNumber, PhoneNumber.id);
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