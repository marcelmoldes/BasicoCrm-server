const AccountsController = require("../controllers/accountsController")

module.exports = (app) => {
    app.get("/accounts", AccountsController.findAllAccounts);
    app.get("/accounts/:id", AccountsController.findOneAccount);
    app.post("/accounts", AccountsController.createAccount)
  //  app.put("/accounts/:id", AccountsController.updateAccount);
  //  app.delete("/accounts/:id,",AccountsController.removeAccount)

}
