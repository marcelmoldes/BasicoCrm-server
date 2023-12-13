
const ActivitiesController = require("../controllers/activitiesController");

module.exports = (app) => {
    app.get("/activities", ActivitiesController.findAllActivities);
    app.get("/activities/:id", ActivitiesController.findOneActivitie);
    app.post("/activities", ActivitiesController.createActivitie)
    app.put("/activities/:id", ActivitiesController.updateActivitie);
    app.delete("/activities/:id,",ActivitiesController.removeActivitie)

}
