const express = require('express');
require('dotenv').config();
const router = express.Router();
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

//Gets info from current User
router.get('/me', getCurrentUser);
//Gets user by id
router.get('/:id', getUserById);
//Gets all the users
router.get('/', getUsers);

//Updates users
router.patch('/me', celebrate(updateProfileSchema), updateUserProfile);
//Updates avatar
router.patch('/me/avatar', celebrate(updateAvatarSchema), updateUserAvatar);

module.exports = router;
