const Joi = require("joi");

module.exports = {
    first_name: Joi.string().alphanum().min(3).max(20).required(),
    last_name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(40).required(),
    profile_image: Joi.string().base64(),
    role: Joi.string().valid('user', 'admin'),
}




