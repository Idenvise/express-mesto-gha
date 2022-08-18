const User = require('../models/users');
const { ERROR_VALIDATION, ERROR_NOTFOUND, ERROR_SERVER } = require('../errors/errors');

module.exports.getUser = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => {
      throw new Error('Пользователь не найден');
    })
    .then((user) => {
      const {
        name, about, avatar, _id,
      } = user;
      res.status(200).send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Неверный идентификатор' });
        return;
      }
      if (err.name === 'Error') {
        res.status(ERROR_NOTFOUND).send({ message: err.message });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Неверные данные пользователя' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Неверные данные пользователя' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.status(200).send(user.avatar))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' }));
};
