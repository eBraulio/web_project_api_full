const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET =
  '3f6ae4482493d42415168086ea93ad191f7ff88a0204b18846ac0dac1e70e466';

const JWT_EXPIRATION = '7d';

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.json(users))
    .catch((err) =>
      res
        .status(500)
        .send({ message: 'Error getting Users', error: err.message })
    );
};

module.exports.getUser = (req, res) => {
  user
    .findById(req.params.userId)
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      res
        .status(statusCode)
        .send({ message: 'Error finding User', error: err.message });
    });
};

module.exports.getUserInfo = (req, res) => {
  user
    .findById(req.user._id)
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      res
        .status(statusCode)
        .send({ message: 'Error finding User', error: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      user.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).send({ message: 'Email already exists' });
      }
      res
        .status(400)
        .send({ message: 'Error creating User', error: err.message });
    });
};

module.exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  user
    .findUserByCredentials(email, password)
    .then((user) => {
      const payload = {
        _id: user._id,
      };

      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      return res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  user
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      const statusCode = err.statusCode || 400;
      res
        .status(statusCode)
        .json({ message: 'Error updating User', error: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  user
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      const statusCode = err.statusCode || 400;
      res
        .status(statusCode)
        .json({ message: 'Error updating Avatar', error: err.message });
    });
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
