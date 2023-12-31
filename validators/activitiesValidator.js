const Joi = require("joi");

module.exports = {
    user_id: Joi.number().integer().required(),
    account_id: Joi.number().integer().required(),
    deal_id: Joi.number().integer().required(),
    contact_id: Joi.number().integer().required(),
    subject: Joi.string().alphanum().min(3).max(100).required(),
    activity_date: Joi.string().isoDate(),
    location: Joi.string().min(3).max(100).required(),
    status: Joi.string().alphanum().min(3).max(50).required(),
    notes: Joi.string().alphanum().min(3).max(255).required(),
    description: Joi.string().alphanum().min(3).max(255).required(),
}
