const router = require('express').Router();
const validator = require('validator');

const { celebrate, Joi, Segments } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

router.get('/cards', getCards);

router.post(
  '/cards',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      link: Joi.required().custom(validateURL),
    }),
  }),
  createCard
);

router.delete('/cards/:cardId', deleteCardById);

router.put('/cards/likes/:cardId', likeCard);

router.delete('/cards/likes/:cardId', dislikeCard);

module.exports = router;

// import express from 'express';

// import {
//   getCards,
//   createCard,
//   deleteCardByIdById,
//   likeCard,
//   dislikeCard,
// } from '../controllers/cards.js';

// const router = express.Router();

// router.get('/', getCards);
// router.post('/', createCard);
// router.delete('/:cardId', deleteCardByIdById);
// router.put('/:cardId/likes', likeCard);
// router.delete('/:cardId/likes', dislikeCard);

// export default router;
