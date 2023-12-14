const Controller = require("../controllers/usersController")
const resource = 'users';

module.exports = (app) => {
    app.get(`/${resource}`, Controller.findAll);
    app.get(`/${resource}/:id`, Controller.findOne);
    app.post(`/${resource}`, Controller.create)
    app.put(`/${resource}/:id`, Controller.update);
    app.delete(`/${resource}/:id`, Controller.remove)
}