const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const errorHandler = require('./middleware/errorHandler');
const { HttpStatus, HttpResponseMessage } = require('./enums/http');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');

// Mongoose
mongoose.connect('mongodb://localhost:27017/aroundb', {});

const app = express();
console.log(process.env.NODE_ENV); // producción

// Enable CORS
// const allowedOrigins = [
//   'http://ebraulio.chickenkiller.com',
//   'http://www.ebraulio.chickenkiller.com',
//   'https://ebraulio.chickenkiller.com',
//   'https://www.ebraulio.chickenkiller.com',
//   'http://localhost:3000',
//   'https://localhost:3000',
// ];
// app.use(cors(allowedOrigins));
// app.use(express.json());

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use(requestLogger);
app.use(errorLogger);

//Crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

//Routes signin and signup
app.use('/auth', authRouter);

//Route controllers
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use((req, res) => {
  res
    .status(HttpStatus.NOT_FOUND)
    .json({ message: HttpResponseMessage.NOT_FOUND });
});

app.use(errors());
app.use(errorHandler);

//Start API
app.listen(PORT, () => {
  console.log(`Cool! The server is listening in the port ${PORT}`);
});
