const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: 'Se requiere autorización' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    const secretWord = NODE_ENV === 'production' ? JWT_SECRET : 'topSecret';
    payload = jwt.verify(token, secretWord);
  } catch (err) {
    return res.status(401).send({ message: 'Se requiere autorización' });
  }

  req.user = payload;

  next();
};
