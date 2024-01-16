const Controller = require("../controllers/activitiesController")
const resource = 'activities';

module.exports = (app) => {
    app.get(`/${resource}`, Controller.findAll);
    app.get(`/${resource}/options`, Controller.getOptions);
    app.get(`/${resource}/:id`, Controller.findOne);
    app.post(`/${resource}`, Controller.create)
    app.put(`/${resource}/:id`, Controller.update);
    app.delete(`/${resource}/:id`, Controller.remove)
}