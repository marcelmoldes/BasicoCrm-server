const {Users} = require('../models')
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

module.exports = async (req) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        throw new Error("Missing authorization header.")
    }
    const token = authorizationHeader.replace("Bearer ", "");
    const decodedJwt = jwt.decode(token, jwtSecret);
    if (!decodedJwt?.id) {
        throw new Error("Missing or invalid jwt.")
    }
    const user = await Users.findByPk(decodedJwt.id);
    if (user) {
        return user;
    } else {
        throw new Error("Access denied.")
    }
}