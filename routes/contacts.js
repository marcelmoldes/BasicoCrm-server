const ContactsController = require("../controllers/contactsController")


module.exports = (app) => {
    app.get("/contacts", ContactsController.findAllContacts);
    app.get("/contacts/:id", ContactsController.findOneContact);
    app.post("/contacts", ContactsController.createContact)
    app.put("/contacts/:id",ContactsController.updateContact);
    app.delete("/contacts/:id",ContactsController.removeContact)

}
