const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, Joi, celebrate } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, postUser } = require('./controllers/users');
const { ERROR_NOTFOUND, ERROR_SERVER } = require('./errors/errors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), postUser);

app.use(auth);

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use('*', (req, res) => {
  res.status(ERROR_NOTFOUND).send({ message: 'Страница не существует' });
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === ERROR_SERVER ? 'На сервере произошла ошибка' : message });
  next(err);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
