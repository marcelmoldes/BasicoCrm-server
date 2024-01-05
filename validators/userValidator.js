const Joi = require("joi");

module.exports = {

    first_name: Joi.string().alphanum().min(3).max(20).required(),
    last_name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    name: Joi.string().alphanum().min(3).max(25),
    website: Joi.string().domain().required(),
    industry: Joi.string().min(3).max(100).required(),
    annual_revenue: Joi.number().min(3).max(999999999).required(),
    employees: Joi.number().min(3).max(999999).required(),
    company_name: Joi.string().alphanum().min(3).max(25).required(),
    password: Joi.string().min(6).max(40).required(),
    profile_image: Joi.string().base64(),

    role: Joi.string().valid('user', 'admin'),
}




