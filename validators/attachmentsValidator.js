const Joi = require("joi");

module.exports = {
    name: Joi.string().alphanum().min(3).max(50).required(),
    path: Joi.string().alphanum().min(3).max(255).required(),

}
