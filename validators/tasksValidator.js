const Joi = require("joi");

module.exports = {
    name: Joi.string().alphanum().min(3).max(50).required(),
    description: Joi.string().alphanum().min(3).max(255).required(),
    due_date:Joi.string().isoDate(),
    status: Joi.string().alphanum().min(3).max(50).required(),
    priority: Joi.string().alphanum().min(3).max(50).required(),

}

