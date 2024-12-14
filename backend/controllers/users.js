//const { NODE_ENV, JWT_SECRET } = process.env;

const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secretWord';

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
