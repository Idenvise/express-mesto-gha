const User = require('../models/users');

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
        res.status(400).send({ message: 'Неверный идентификатор' });
        return;
      }
      if (err.name === 'Error') {
        res.status(404).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users) {
        res.status(200).send({ users });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((user) => res.status(500).send({ message: user }));
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(() => res.status(200).send({ message: 'Данные пользователя обновлены' }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(() => res.status(200).send({ message: 'Аватар пользователя обновлен' }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
