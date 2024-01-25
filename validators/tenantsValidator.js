const Joi = require("joi");

module.exports = {
    name: Joi.string().alphanum().min(3).max(25),
    website: Joi.string().domain().required(),
    industry: Joi.string().min(3).max(100).required(),
    annual_revenue: Joi.number().min(3).max(999999999).required(),
    employees: Joi.number().min(3).max(10000).required()

}


