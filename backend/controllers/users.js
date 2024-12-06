const User = require('../models/user');
const handleError = require('../utils/HandleError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/////////

const getUsers = (req, res) => {
  User.find({}).then((user) => {
    res.send(user);
  });
};

const getUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => handleError(error, res));
};

const createUser = (req, res) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((error) => {
      handleError(error, res);
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const secretWord = NODE_ENV === 'production' ? JWT_SECRET : 'topSecret';
      const token = jwt.sign({ _id: user._id }, secretWord, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => handleError(error, res));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => handleError(error, res));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  updateUser,
  updateUserAvatar,
};

// export async function getUsers(req, res) {
//   User.find({})
//     .then((users) => res.status(200).json(users))
//     .catch((err) =>
//       res
//         .status(500)
//         .json({ message: 'Error al obtener los Users', error: err })
//     );
// }

// export async function getUser(req, res) {
//   User.findById(req.params.userId)
//     .orFail(() => {
//       const error = new Error('User not found');
//       error.statusCode = 404;
//       throw error;
//     })
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((err) => {
//       const statusCode = err.statusCode || 500;
//       res
//         .status(statusCode)
//         .send({ message: 'Error finding User', error: err.message });
//     });
// }

// export async function getUserInfo(req, res) {
//   User.findById(req.user._id)
//     .orFail(() => {
//       const error = new Error('User not found');
//       error.statusCode = 404;
//       throw error;
//     })
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((err) => {
//       const statusCode = err.statusCode || 500;
//       res
//         .status(statusCode)
//         .send({ message: 'Error finding User', error: err.message });
//     });
// }

// export async function createUser(req, res) {
//   const { name, about, avatar, email, password } = req.body;

//   bcrypt
//     .hash(password, 10)
//     .then((hash) => User.create({ name, about, avatar, email, password: hash }))
//     .then((user) => res.status(201).json(user))
//     .catch((err) =>
//       res
//         .status(500)
//         .json({ message: 'Error al crear un User nuevo', error: err })
//     );
// }

// export async function loginUser(req, res) {
//   const { email, password } = req.body;

//   User.findUserByCredentials(email, password)
//     .then((user) => {
//       const payload = {
//         _id: user._id,
//       };

//       const token = jwt.sign(payload, JWT_SECRET, {
//         expiresIn: JWT_EXPIRATION,
//       });

//       return res.send({ token });
//     })
//     .catch((err) => {
//       res.status(401).send({ message: err.message });
//     });
// }

// export async function getUserById(req, res) {
//   console.log(req.params.userId);
//   User.findById(req.params.userId)
//     .orFail(() => {
//       const error = new Error('El Usuario no fue encontrado');
//       error.statusCode = 404;
//       throw error;
//     })
//     .then((user) => res.status(200).json(user))
//     .catch((err) => {
//       if ((err.statusCode = 404)) {
//         return res.status(404).json({ message: err.message });
//       }
//       res
//         .status(500)
//         .json({ message: 'Error al obtener el usuario', error: err });
//     });
// }

// export async function updateUser(req, res) {
//   const { name, about } = req.body;

//   User.findByIdAndUpdate(
//     req.user._id,
//     { name, about },
//     { new: true, runValidators: true }
//   )
//     .orFail(() => {
//       const error = new Error('El Usuario no fue encontrado');
//       error.statusCode = 404;
//       throw error;
//     })
//     .then((user) => res.status(200).json(user))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return res
//           .status(400)
//           .json({ message: 'Datos no válidos', error: err });
//       }
//       if (err.statusCode === 404) {
//         return res.status(404).json({ message: err.message });
//       }
//       res
//         .status(500)
//         .json({ message: 'Error al actualizar el usuario', error: err });
//     });
// }

// export async function updateUserAvatar(req, res) {
//   const { avatar } = req.body;

//   User.findByIdAndUpdate(
//     req.user._id,
//     { avatar },
//     { new: true, runValidators: true }
//   )
//     .orFail(() => {
//       const error = new Error('El usuario no fue encontrado');
//       error.statusCode = 404;
//       throw error;
//     })
//     .then((user) => res.status(200).json(user))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return res
//           .status(400)
//           .json({ message: 'Datos no válidos', error: err });
//       }
//       if (err.statusCode === 404) {
//         return res.status(404).json({ message: err.message });
//       }
//       res
//         .status(500)
//         .json({ message: 'Error al actualizar el avatar', error: err });
//     });
// }
