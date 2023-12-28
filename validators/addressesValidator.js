const Joi = require("joi");

module.exports = {
    account_id: Joi.number().integer(),
    contact_id: Joi.number().integer(),
    tenant_id: Joi.number().integer(),
    street_address1: Joi.string().alphanum().min(3).max(255).required(),
    street_address2: Joi.string().alphanum().min(3).max(255).required(),
    state: Joi.string().alphanum().min(3).max(50).required(),
    city: Joi.string().alphanum().min(3).max(50).required(),
    country:Joi.string().alphanum().min(3).max(50).required(),
    postal_code:Joi.number().max(9999).required(),
}

