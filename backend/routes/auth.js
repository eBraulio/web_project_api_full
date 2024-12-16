//only KS
const express = require('express');
const { celebrate } = require('celebrate');
const { signupSchema, loginSchema } = require('../validation/schemas');
const { createUser, login } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', celebrate(signupSchema), createUser);
router.post('/signin', celebrate(loginSchema), login);

module.exports = router;
