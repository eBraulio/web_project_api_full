const express = require('express');

const router = express.Router();
//const auth = require('../middlewares/auth');
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  updateProfileSchema,
  updateAvatarSchema,
} = require('../validation/schemas');

//Middleware de autorizacion
// router.use(auth);

//Rutas protegidas
//Obtener datos del usuario actual
router.get('/me', getCurrentUser);
//Obtener un usuario por id
router.get('/:id', getUserById);
//Obtener todos los usuarios
router.get('/', getUsers);

//Actualizar usuario
router.patch('/me', celebrate(updateProfileSchema), updateUserProfile);
//Actualizar avatar
router.patch('/me/avatar', celebrate(updateAvatarSchema), updateUserAvatar);

module.exports = router;
