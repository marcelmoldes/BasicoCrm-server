const Controller = require("../controllers/attachmentsController")
const resource = 'attachments';

module.exports = (app) => {
    app.get(`/${resource}`, Controller.findAll);
    app.get(`/${resource}/:id`, Controller.findOne);
    app.post(`/${resource}`, Controller.create)
    app.put(`/${resource}/:id`, Controller.update);
    app.delete(`/${resource}/:id`, Controller.remove)
}