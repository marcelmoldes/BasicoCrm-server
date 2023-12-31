const Joi = require("joi");

module.exports = {
    account_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    deal_id: Joi.number().integer().required(),
    contact_id: Joi.number().integer().required(),
    name: Joi.string().alphanum().min(3).max(50).required(),
    description: Joi.string().alphanum().min(3).max(255).required(),
    due_date:Joi.string().isoDate(),
    status: Joi.string().alphanum().min(3).max(50).required(),
    priority: Joi.string().alphanum().min(3).max(50).required(),

}

