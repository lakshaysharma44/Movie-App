const Joi = require("joi");

module.exports.userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    gender: Joi.string().required(),
    ticketNumber: Joi.number().required(),
    row: Joi.number()
});

module.exports.movieSchema = Joi.object({
    movieName: Joi.string().required(),
    duration: Joi.number().required(),
    isAdult: Joi.boolean().required()
});