const UsersController = require("../controllers/usersController")


module.exports = (app) => {
    app.get("/users", UsersController.findAllUsers);
    app.get("/users/:id", UsersController.findOneUser);
    app.post("/users", UsersController.createUser)
    app.put("/users/:id", UsersController.updateUser);
    app.delete("/users/:id",UsersController.removeUser)
    //app.post("/users/login", UsersController.login);
   // app.post("/users/:id/changePassword", UsersController.changePassword);
   // app.post("/users/:id/forgotPassword", UsersController.forgotPassword);

}
