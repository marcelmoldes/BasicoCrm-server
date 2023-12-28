const Joi = require("joi");

module.exports = {
    field: Joi.string().alphanum().min(3).max(100).required(),
    value: Joi.number().min(3).max(9999999999).required(),
    tenant_id: Joi.number().integer().required(),
}