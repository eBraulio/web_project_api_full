//only NIC
// validations/userValidation.js
const { Joi } = require('celebrate');

const createUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'any.required': 'El campo "email" es obligatorio.',
      'string.email': 'El campo "email" debe ser un correo electrónico válido.',
    }),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string()
      .uri()
      .default(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      ),
  }),
};

const loginUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const updateUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'any.required': 'El campo "name" es obligatorio.',
      'string.min': 'El campo "name" debe tener al menos 2 caracteres.',
      'string.max': 'El campo "name" debe tener como máximo 30 caracteres.',
    }),
    email: Joi.string().email(),
  }),
};

const updateAvatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
};

module.exports = {
  createUserValidation,
  loginUserValidation,
  updateUserValidation,
  updateAvatarValidation,
};
