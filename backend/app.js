require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middleware/logger');
const hasError = require('./middleware/hasError');
//const { allowedOrigins } = require('./utils/const');
const { errors } = require('celebrate');

const app = express();

//
// const { NODE_ENV, JWT_SECRET } = process.env;
// const token = jwt.sign(
//   { _id: user._id },
//   NODE_ENV === 'production' ? JWT_SECRET : 'topSecret'
// );

const allowedOrigins = [
  'http://ebraulio.chickenkiller.com',
  'http://www.ebraulio.chickenkiller.com',
  'https://ebraulio.chickenkiller.com',
  'https://www.ebraulio.chickenkiller.com',
  'http://localhost:3000',
  'https://localhost:3000',
];
//

const { PORT = 3000 } = process.env;
mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Conectado a la base de datos en MongoDB');
  })
  .catch((err) => {
    console.log('algo debió de salir mal', err);
  });
app.use(cors());
app.options('*', cors(allowedOrigins));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
app.use(userRoutes);
app.use(cardsRoutes);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.use(errorLogger);

app.use(errors());

app.use(hasError);

app.listen(PORT, () => {
  console.log(`Servidor corriendoo en puerto ${PORT}`);
});
