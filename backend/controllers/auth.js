//only ks
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { HttpStatus, HttpResponseMessage } = require('../enums/http');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hashedPassword,
      })
    )
    .then((user) => res.status(HttpStatus.CREATED).send({ data: user }))
    .catch((err) => {
      const newError = err;

      if (newError.name === 'ValidationError') {
        newError.statusCode = HttpStatus.BAD_REQUEST;
      }
      next(newError);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        const error = new Error(HttpResponseMessage.UNAUTHORIZED);
        error.statusCode = HttpStatus.UNAUTHORIZED;
        return next(error);
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return next(err);
        }
        if (!isMatch) {
          const error = new Error(HttpResponseMessage.UNAUTHORIZED);
          error.statusCode = HttpStatus.UNAUTHORIZED;
          return next(error);
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' }
        );
        return res.send({ token });
      });
      return next;
    })
    .catch(next);
};
