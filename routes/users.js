const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUser, getUsers, patchUser, patchUserAvatar, getUserMe,
} = require('../controllers/users');

router.get('/users/me', getUserMe);
router.get('/users', getUsers);
router.get('/users/:_id', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().length(24),
  }),
}), getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/),
  }),
}), patchUserAvatar);

module.exports = router;
