const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards) {
        res.status(200).send(cards);
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then(() => res.status(200).send({ message: 'card deleted' }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.setLike = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
