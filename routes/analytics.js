const Controller = require("../controllers/analyticsController")
const resource = 'analytics';


module.exports = (app) => {
app.get(`/${resource}/kpis`, Controller.getKpis);

}