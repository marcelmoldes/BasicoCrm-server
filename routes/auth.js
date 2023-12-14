const AuthController = require("../controllers/authController")

module.exports = (app) => {
   app.post("/auth/login", AuthController.login);
   // app.post("/auth/:id/changePassword", UsersController.changePassword);
   // app.post("/auth/:id/forgotPassword", UsersController.forgotPassword);
}
