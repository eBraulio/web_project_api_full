//only NIC
const Joi = require('joi');

// Validación para crear una tarjeta
const createCardValidation = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().uri().required(),
  owner: Joi.string().required(),
});

// Validación para eliminar una tarjeta
// Aunque la eliminación no requiere datos en el body, podemos validar el ID en los params si es necesario
const deleteCardValidation = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

module.exports = { createCardValidation, deleteCardValidation };
