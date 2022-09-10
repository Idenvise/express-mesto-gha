const cors = require('cors');

const options = {
  origin: [
    'http://localhost:порт',
    'https://frontend.mesto.nomorepartiesxyz.ru',
    'https://YOUR.github.io',
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
};
