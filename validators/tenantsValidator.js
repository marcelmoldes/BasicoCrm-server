const Joi = require("joi");

module.exports = {
    ownerId: Joi.number().integer().required(),
    addressId: Joi.number().integer().required(),
    phoneId: Joi.number().integer().required(),
    name: Joi.string().alphanum().min(3).max(25).required(),
    website: Joi.string().domain().required(),
    industry: Joi.string().min(3).max(100).required(),
    annual_revenue: Joi.number().min(3).max(999999999).required(),
    employees: Joi.number().min(3).max(999999).required(),
    type: Joi.string().alphanum().min(3).max(25).required(),
}
