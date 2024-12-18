const jwt = require('jsonwebtoken');
const { HttpStatus, HttpResponseMessage } = require('../enums/http');
require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  //Gets token from headers
  const token = req.headers.authorization
    ? req.headers.authorization.replace('Bearer ', '')
    : null;

  if (!token) {
    return res
      .status(HttpStatus.FORBIDDEN)
      .send({ message: HttpResponseMessage.FORBIDDEN });
  }

  let payload;

  try {
    //Verifies Token using JWT_SECRET
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secretWord'
    );
  } catch (err) {
    return res
      .status(HttpStatus.FORBIDDEN)
      .send({ message: HttpResponseMessage.FORBIDDEN });
  }
  //Adds verified token to request
  req.user = payload;
  //Goes to next Middleware
  return next();
};
