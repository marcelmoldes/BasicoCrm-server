const Joi = require("joi");

module.exports = {
    country_code: Joi.string().alphanum().min(1).max(2).required(),
    number: Joi.number().min(3).max(14).required(),

}