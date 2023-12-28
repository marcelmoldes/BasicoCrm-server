const Joi = require("joi");

module.exports = {
    account_id: Joi.number().integer(),
    contact_id: Joi.number().integer(),
    tenant_id: Joi.number().integer(),
    country_code: Joi.string().alphanum().min(1).max(2).required(),
    number: Joi.number().min(3).max(99999999999999).required(),
}