const Joi = require("joi");

module.exports = {
    user_id: Joi.number().integer().required(),
    name: Joi.string().alphanum().min(3).max(25).required(),
    website: Joi.string().domain().required(),
    industry: Joi.string().min(3).max(100).required(),
    annual_revenue: Joi.number().min(3).max(100000000).required(),
    employees: Joi.number().min(3).max(100000).required(),
    notes: Joi.string().max(255)
}
