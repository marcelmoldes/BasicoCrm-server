const Joi = require("joi");

module.exports = {
    account_id: Joi.number().allow(null),
    user_id: Joi.number().integer().required(),
    deal_id: Joi.number().integer().allow(null),
    contact_id: Joi.number().allow(null),
    name: Joi.string().min(3).max(50).required(),
    due_date:Joi.string().isoDate(),
    status: Joi.string().min(3).max(50).required(),
    priority: Joi.string().min(3).max(50).required(),
}

