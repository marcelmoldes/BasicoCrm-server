const Joi = require("joi");

module.exports = {
    user_id:  Joi.number().required(),
    contact_id: Joi.number().allow(null),
    account_id: Joi.number().allow(null),
    title: Joi.string().alphanum().min(3).max(100).required(),
    activity_date: Joi.string().isoDate().required(),
    location: Joi.string().min(3).max(100).required(),
    status:  Joi.string().alphanum().required(),
    notes: Joi.string().min(3).max(50).required(),
}
