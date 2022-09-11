const options = {
  origin: [
    'http://localhost:3000',
    'https://frontend.mesto.nomorepartiesxyz.ru',
    'https://Idenvise.github.io',
    'http://frontend.mesto.nomorepartiesxyz.ru/',
    'http://back.mesto.ru.nomorepartiesxyz.ru/',
    'https://web.postman.co/',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = {
  options,
};
