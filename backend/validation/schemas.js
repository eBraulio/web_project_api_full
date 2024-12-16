const { Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// Esquemas de validación para users
const signupSchema = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};

const loginSchema = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};

const updateProfileSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

const updateAvatarSchema = {
  body: Joi.object({
    avatar: Joi.string().custom(validateURL),
  }),
};

// Esquemas de validación para cards
const createCardSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateURL),
  }),
};

const cardIdSchema = {
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  signupSchema,
  loginSchema,
  updateProfileSchema,
  updateAvatarSchema,
  createCardSchema,
  cardIdSchema,
};
