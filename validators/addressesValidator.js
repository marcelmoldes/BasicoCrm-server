const Joi = require("joi");

module.exports = {
    street_address1: Joi.string().min(3).max(255).required(),
    street_address2: Joi.string().min(3).max(255).allow(null, ''),
    state: Joi.string().min(3).max(50).required(),
    city: Joi.string().min(3).max(50).required(),
    country: Joi.string().min(3).max(50).required(),
    postal_code: Joi.number().max(99999).required(),
}

