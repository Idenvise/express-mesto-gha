const Card = require('../models/card');
const { ERROR_VALIDATION, ERROR_NOTFOUND, ERROR_SERVER } = require('../errors/errors');

module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .orFail(() => {
      throw new Error('Карточка не найдена');
    })
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === 'Error') {
        res.status(ERROR_NOTFOUND).send(err.message);
        return;
      }
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Неверный идентификатор' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Неверные данные карточки' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
};

module.exports.setLike = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new Error('Карточка не найдена');
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Неверный идентификатор' });
        return;
      }
      if (err.name === 'Error') {
        res.status(ERROR_NOTFOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new Error('Карточка не найдена');
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Неверный идентификатор' });
        return;
      }
      if (err.name === 'Error') {
        res.status(ERROR_NOTFOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
};
