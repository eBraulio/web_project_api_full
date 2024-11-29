import express from 'express';

import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/:userId', updateUser);
router.patch('/:userId/avatar', updateUserAvatar);

export default router;
