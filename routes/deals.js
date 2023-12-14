const DealsController = require("../controllers/dealsController")


module.exports = (app) => {
    app.get("/deals", DealsController.findAllDeals);
    app.get("/deals/:id", DealsController.findOneDeal);
    app.post("/deals", DealsController.createDeal)
    app.put("/deals/:id", DealsController.updateDeal);
   app.delete("/deals/:id",DealsController.removeDeal)
}
