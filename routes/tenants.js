const Controller = require("../controllers/tenantsController")
const resource = 'tenants';

module.exports = (app) => {
    app.get(`/${resource}`, Controller.findAll);
    app.get(`/${resource}/:id`, Controller.findOne);
    app.post(`/${resource}`, Controller.create)
    app.put(`/${resource}/:id`, Controller.update);
    app.delete(`/${resource}/:id`, Controller.remove)
}