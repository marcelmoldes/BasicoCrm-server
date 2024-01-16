const Joi = require("joi");

module.exports = {
    user_id:  Joi.number().required(),
    contact_id: Joi.number().allow(null),
    account_id: Joi.number().allow(null),
    title: Joi.string().min(3).max(100).required(),
    activity_date: Joi.string().isoDate().required(),
    location: Joi.string().min(3).max(100).required(),
    completed:  Joi.boolean(),
    notes: Joi.string().min(3).max(50).required(),
}
