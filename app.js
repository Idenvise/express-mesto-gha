const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors, Joi, celebrate } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, postUser } = require('./controllers/users');
const { ERROR_SERVER } = require('./errors/errors');
const { regExpLink } = require('./middlewares/linkValidation');
const NotFoundError = require('./errors/notFoundError');

const options = {
  origin: [
    'localhost:3000',
    'https://web.postman.co/',
    'https://ВАШ ДОМЕЙН С ДОКУМЕНТА',
    'https://YOUR.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
const { PORT = 3000 } = process.env;
const app = express();

app.use('*', (req, res) => {
  console.log(req.headers.origin);
});

app.use('*', cors(options));

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
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(regExpLink),
  }),
}), postUser);

app.use(auth);

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;
  res.status(statusCode).send({ message: statusCode === ERROR_SERVER ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
