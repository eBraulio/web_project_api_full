const express = require('express');
require('dotenv').config();
const router = express.Router();
const { celebrate } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { createCardSchema, cardIdSchema } = require('../validation/schemas');

// Gets all the Cards
router.get('/', getCards);

// Create card
router.post('/', celebrate(createCardSchema), createCard);

// Delete card
router.delete('/:cardId', celebrate(cardIdSchema), deleteCard);

// Give like
router.put('/likes/:cardId', celebrate(cardIdSchema), likeCard);

// Remove like
router.delete('/likes/:cardId', celebrate(cardIdSchema), dislikeCard);

module.exports = router;
