import express from 'express';
import userRoutes from './routes/users.js';
import cardsRoutes from './routes/cards.js';
import mongoose from 'mongoose';

const app = express();
mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Conectado a la base de datos en MongoDB');
  })
  .catch((err) => {
    console.log('algo debió de salir mal', err);
  });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '66fc3eb18baf7a8ae72d5a66',
  };
  next();
});
app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Servidor corriendoo en puerto ${PORT}`);
});
