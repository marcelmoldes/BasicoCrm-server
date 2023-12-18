const Joi = require("joi");

module.exports = {
    ownerId: Joi.number().integer().required(),
    accountId: Joi.number().integer().required(),
    dealId: Joi.number().integer().required(),
    contactId: Joi.number().integer().required(),

    subject: Joi.string().alphanum().min(3).max(100).required(),
    activity_date: Joi.string().isoDate(),
    location: Joi.string().min(3).max(100).required(),
    status: Joi.string().alphanum().min(3).max(50).required(),
    notes: Joi.string().alphanum().min(3).max(255).required(),
    description: Joi.string().alphanum().min(3).max(255).required(),

}
