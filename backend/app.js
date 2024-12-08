const { PORT = 3000 } = process.env;
const express = require('express');
const app = express();

// MongoDB
const mongoose = require('mongoose');

// Importamos error para manejar los errores de celebrate
const { errors } = require('celebrate');

//Importamos nuestros loggers de errores y solicitudes
const { requestLogger, errorLogger } = require('./middleware/logger');

//Moongose a la database
mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Conexión exitosa a aroundb');
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
  });

// Aqui van los Routes
const users = require('./routes/users');
const cards = require('./routes/cards');
const { error } = require('winston');

// CORS
const cors = require('cors');

//Pruebas de caida al servidor
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

//Habilitar CORS
app.use(cors());
app.options('*', cors());

//Middleware para procesar solicitudes json
app.use(express.json());

//Conectamos el logger de solicitudes
app.use(requestLogger);

//Routes de tarjetas y usuarios

app.use('/cards', cards);
app.use('/', users);

//Conectamos el logger de errores
app.use(errorLogger);

//Controlador de celebrate para errores
app.use(errors());

// middleware para error 404
app.use((req, res, next) => {
  res.status(403).json({
    message: "You don't have access to this resource",
  });
});

app.listen(PORT, () => {
  console.log(`The server is listening in the port http://localhost:${PORT}/`);
});
