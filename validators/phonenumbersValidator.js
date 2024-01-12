const Joi = require("joi");

module.exports = {
    country_code: Joi.string().min(1).max(2).required(),
    number: Joi.number().min(3).max(99999999999999).required(),
}