const express = require('express');
const users = express.Router();

const {
  getUsers,
  getUser,
  getUserInfo,
  createUser,
  updateUser,
  updateAvatar,
  loginUser,
} = require('../controllers/users');

const auth = require('../middleware/auth');

const { celebrate, Joi } = require('celebrate');

//POST Para registrar un Usuario
users.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().optional(),
      about: Joi.string().optional(),
      avatar: Joi.string().optional(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  createUser
);

//POST Para hacer login
users.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  loginUser
);

//Middleware Auth
users.use(auth);

//GET Para obtener el json de los Usuarios
users.get('/users', getUsers);

//GET Para obtener la información del usuario mediante el _id dentro de req.body(Cuerpo de la solicitud, generado por el middleware auth)
users.get('/users/me', getUserInfo);

//GET Para obtener el json de un Usuario especifico
users.get('/users/:userId', getUser);

//PATCH Para actualizar un Usuarionp
users.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(100).required(),
    }),
  }),
  updateUser
);

//PATCH Para actualizar el Avatar
users.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri().required(),
    }),
  }),
  updateAvatar
);

users.use((req, res, next) => {
  res.status(403).json({
    message: "You don't have access to this resource",
  });
});

module.exports = users;
