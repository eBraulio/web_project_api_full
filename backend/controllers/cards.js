const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  const user = req.user._id;
  Card.find({ owner: user })
    .then((cards) => res.json(cards))
    .catch((err) =>
      res
        .status(500)
        .send({ message: 'Error getting Cards', error: err.message })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  console.log('SI ENTRO');
  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) =>
      res
        .status(500)
        .send({ message: 'Error creating Card', error: err.message })
    );
};

module.exports.deleteCardById = (req, res) => {
  const user = req.user._id;
  console.log('Este es el user ', user);
  const idTarjeta = req.params.cardId;
  console.log('Este es la tarjeta a eliminar', idTarjeta);
  Card.findById(idTarjeta)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }

      if (card.owner.toString() !== user.toString()) {
        return res
          .status(403)
          .send({ message: 'You do not have permission to delete this card.' });
      }

      return Card.findByIdAndDelete(idTarjeta);
    })
    .then(() => {
      res.send({ message: 'Card Deleted Sucessfully' });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: 'Error deleting Card', error: err.message })
    );
};

module.exports.likeCard = (req, res) => {
  const user = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: user } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error('Card was not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => {
      const statusCode = err.statusCode || 400;
      res
        .status(statusCode)
        .json({ message: 'Error liking Card', error: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  const user = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: user } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error('Card was not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => {
      const statusCode = err.statusCode || 400;
      res
        .status(statusCode)
        .json({ message: 'Error disliking Card', error: err.message });
    });
};
