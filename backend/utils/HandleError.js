const handleError = (error, res) => {
  const ERROR_CODE = 400;
  if (error.name === 'NOT_FOUND') {
    return res.status(error.statusCode).send({
      status: false,
      message: 'Elemento no encontrado',
    });
  } else {
    return res.status(ERROR_CODE).send({
      status: false,
      message: 'Error de petición',
    });
  }
};

module.exports = handleError;
