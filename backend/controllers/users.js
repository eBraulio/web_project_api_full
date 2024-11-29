import User from '../models/user.js';

export async function getUsers(req, res) {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res
        .status(500)
        .json({ message: 'Error al obtener los Users', error: err })
    );
}

export async function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) =>
      res
        .status(500)
        .json({ message: 'Error al crear un User nuevo', error: err })
    );
}

export async function getUserById(req, res) {
  console.log(req.params.userId);
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('El Usuario no fue encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if ((err.statusCode = 404)) {
        return res.status(404).json({ message: err.message });
      }
      res
        .status(500)
        .json({ message: 'Error al obtener el usuario', error: err });
    });
}

export async function updateUser(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error('El Usuario no fue encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .json({ message: 'Datos no válidos', error: err });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message });
      }
      res
        .status(500)
        .json({ message: 'Error al actualizar el usuario', error: err });
    });
}

export async function updateUserAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error('El usuario no fue encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .json({ message: 'Datos no válidos', error: err });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message });
      }
      res
        .status(500)
        .json({ message: 'Error al actualizar el avatar', error: err });
    });
}
