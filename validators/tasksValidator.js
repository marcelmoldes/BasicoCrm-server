const Joi = require("joi");

module.exports = {
    accountId: Joi.number().integer().required(),
    ownerId: Joi.number().integer().required(),
    dealId: Joi.number().integer().required(),
    contactId: Joi.number().integer().required(),
    name: Joi.string().alphanum().min(3).max(50).required(),
    description: Joi.string().alphanum().min(3).max(255).required(),
    due_date:Joi.string().isoDate(),
    status: Joi.string().alphanum().min(3).max(50).required(),
    priority: Joi.string().alphanum().min(3).max(50).required(),

}

