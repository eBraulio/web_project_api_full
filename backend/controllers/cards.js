import Card from '../models/card.js';

export async function getCards(req, res) {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch((res) =>
      res
        .status(500)
        .send({ message: 'Error al obtener las CARDS', error: err.message })
    );
}

export async function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;
  console.log(owner);
  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) =>
      res
        .status(500)
        .send({ message: 'Error al crear una CARD', error: err.message })
    );
}

export async function deleteCardById(req, res) {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'La Card no fue encontrada' });
      }
      res.send({ message: 'La Card se borró correctamente' });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: 'Error al borrar la Card', error: err.message })
    );
}

export async function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error('La Card no fue encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res
        .status(200)
        .json({ message: 'A la Card se le dió Like exitosamente' });
    })
    .catch((err) => {
      const statusCode = err.statusCode || 400;
      res
        .status(statusCode)
        .json({ message: 'Error al poner Like', error: err.message });
    });
}

export async function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )

    .orFail(() => {
      const error = new Error('La Card no fue encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res
        .status(200)
        .json({ message: 'A la carta se le quitó Like exitosamente' });
    })
    .catch((err) => {
      const statusCode = err.statusCode || 400;
      res
        .status(statusCode)
        .json({ message: 'Error al quitar Like', error: err.message });
    });
}
