module.exports = (err, req, res, next) => {
  if (!err.name) {
    res.status(500).send({ message: 'Internal Error' });
    return;
  }
  res.status(err.statusCode).send({ message: err.message });
};
