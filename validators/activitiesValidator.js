const Joi = require("joi");

module.exports = {
    subject: Joi.string().alphanum().min(3).max(100).required(),
    activity_date:  Joi.string().isoDate(),
    location: Joi.string().min(3).max(100).required(),
    status: Joi.string().alphanum().min(3).max(50).required(),
    notes: Joi.string().alphanum().min(3).max(255).required(),
    description: Joi.string().alphanum().min(3).max(255).required(),

}
