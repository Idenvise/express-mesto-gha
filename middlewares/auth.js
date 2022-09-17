const jwt = require('jsonwebtoken');
const { ERROR_UNAUTHORIZED } = require('../errors/errors');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)
  if (!token) {
    return res.status(ERROR_UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(token, 'super-giga-mega-secret-key');
  } catch (err) {
    return res
      .status(ERROR_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
