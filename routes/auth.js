const AuthController = require("../controllers/authController")

module.exports = (app) => {
   app.post("/auth/register", AuthController.register);
   app.post("/auth/login", AuthController.login);
   app.post("/auth/:id/changePassword", AuthController.changePassword);
   // app.post("/auth/:id/forgotPassword", UsersController.forgotPassword);
}
