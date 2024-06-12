const Joi = require('joi');

const postValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(), // Assuming image is stored as base64 string
    tags: Joi.array().items(Joi.string().alphanum().length(24)) // Assuming tag IDs are 24-character alphanumeric strings
});

module.exports = postValidationSchema;