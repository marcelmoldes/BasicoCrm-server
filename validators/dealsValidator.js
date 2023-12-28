const Joi = require("joi");

module.exports = {
    owner_id: Joi.number().integer().required(),
    account_id: Joi.number().integer().required(),
    deal_name: Joi.string().alphanum().min(3).max(50).required(),
    deal_value: Joi.number().min(3).max(100000000).required(),
    close_date: Joi.string().isoDate(),
    status: Joi.string().alphanum().min(3).max(50).required(),
}

