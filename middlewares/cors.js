const cors = require('cors');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

function setPermittedSources(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
}

const options = {
  origin: [
    'http://localhost:порт',
    'https://frontend.mesto.nomorepartiesxyz.ru',
    'https://YOUR.github.io',
    'http://frontend.mesto.nomorepartiesxyz.ru/',
    'http://back.mesto.ru.nomorepartiesxyz.ru/',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = {
  cors,
  options,
  setPermittedSources,
};
