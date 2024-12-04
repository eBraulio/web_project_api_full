import express from 'express';

import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateUserAvatar,
  loginUser,
  getUserInfo,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
//router.post('/', createUser);
router.post('/signin', loginUser);
router.post('/signup', createUser);
router.patch('/:userId', updateUser);
router.patch('/:userId/avatar', updateUserAvatar);
router.get('/users/me', getUserInfo); // para recibir información sobre el usuario actual segun instrucciones

export default router;
