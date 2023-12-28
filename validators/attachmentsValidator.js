const Joi = require("joi");

module.exports = {
    deal_id: Joi.number().integer().required(),
    contact_id: Joi.number().integer().required(),
    account_id: Joi.number().integer().required(),
    name: Joi.string().alphanum().min(3).max(50).required(),
    path: Joi.string().alphanum().min(3).max(255).required(),
}
