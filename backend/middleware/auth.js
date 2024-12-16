const jwt = require('jsonwebtoken');
const { HttpStatus, HttpResponseMessage } = require('../enums/http');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  //Obtener el token de los encabezados de la solicitud
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
    //Verificar el token usando el JWT secreto
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    );
  } catch (err) {
    return res
      .status(HttpStatus.FORBIDDEN)
      .send({ message: HttpResponseMessage.FORBIDDEN });
  }
  // Añadir el payload del token verificado al objeto de solicitud
  req.user = payload;
  //Continuar al siguiente middleware
  return next();
};
