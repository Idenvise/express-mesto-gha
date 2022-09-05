const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getCards, postCard, deleteCard, setLike, removeLike,
} = require('../controllers/cards');
const { regExpLink } = require('../middlewares/linkValidation');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().regex(regExpLink),
  }),
}), postCard);
router.delete('/cards/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required().length(24),
  }),
}), deleteCard);
router.put('/cards/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required().length(24),
  }),
}), setLike);
router.delete('/cards/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required().length(24),
  }),
}), removeLike);

module.exports = router;
