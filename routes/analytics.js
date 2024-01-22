const Controller = require("../controllers/analyticsController")
const resource = 'analytics';


module.exports = (app) => {
app.get(`/${resource}/kpis`, Controller.getKpis);
    app.get(`/${resource}/stats`, Controller.getStats);
    app.get(`/${resource}/funnelDealStats`, Controller.getFunnelStats);
}