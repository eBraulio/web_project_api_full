const { HttpStatus, HttpResponseMessage } = require('../enums/http');

module.exports = (err, req, res, next) => {
  const { statusCode = HttpStatus.INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    messaje:
      statusCode === HttpStatus.INTERNAL_SERVER_ERROR
        ? HttpResponseMessage.SERVER_ERROR
        : message,
  });
};
