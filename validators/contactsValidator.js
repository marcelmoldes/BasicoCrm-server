const Joi = require("joi");

module.exports = {
    first_name: Joi.string().alphanum().min(3).max(20).required(),
    last_name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    lead_source: Joi.string().min(3).max(50).required(),
    website: Joi.string().domain().required(),
    annual_revenue: Joi.number().min(3).max(1000000).required(),
    lead_status: Joi.string().alphanum().min(3).max(50).required(),
    industry: Joi.string().alphanum().min(3).max(100).required(),
    notes: Joi.string().min(3).max(5).required(),
    title: Joi.string().alphanum().min(3).max(100).required(),
}

