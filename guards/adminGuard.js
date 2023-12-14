const privateGuard = require('../guards/privateGuard')

module.exports = async (req) => {
    const user = await privateGuard(req);
    if (user.role === 'admin') {
        return user;
    } else {
        throw new Error("Access denied.")
    }
}