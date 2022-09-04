const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getCards, postCard, deleteCard, setLike, removeLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().regex(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/),
  }),
}), postCard);
router.delete('/cards/:_id', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().length(24),
  }),
}), deleteCard);
router.put('/cards/:_id/likes', setLike);
router.delete('/cards/:_id/likes', removeLike);

module.exports = router;
