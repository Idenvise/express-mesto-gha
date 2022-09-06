const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUser, getUsers, patchUser, patchUserAvatar, getUserMe,
} = require('../controllers/users');
const { regExpLink } = require('../middlewares/linkValidation');

router.get('/users/me', getUserMe);
router.get('/users', getUsers);
router.get('/users/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required().length(24),
  }),
}), getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().regex(regExpLink),
  }),
}), patchUserAvatar);

module.exports = router;
