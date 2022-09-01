const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getCards, postCard, deleteCard, setLike, removeLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), postCard);
router.delete('/cards/:_id', deleteCard);
router.put('/cards/:_id/likes', setLike);
router.delete('/cards/:_id/likes', removeLike);

module.exports = router;
