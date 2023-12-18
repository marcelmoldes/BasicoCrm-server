const Joi = require("joi");

module.exports = {
    dealId: Joi.number().integer().required(),
   contactId: Joi.number().integer().required(),
    accountId: Joi.number().integer().required(),

    name: Joi.string().alphanum().min(3).max(50).required(),
    path: Joi.string().alphanum().min(3).max(255).required(),

}
