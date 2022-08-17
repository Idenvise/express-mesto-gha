const router = require('express').Router();
const {
  getUser, getUsers, postUser, patchUser, patchUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:_id', getUser);
router.post('/users', postUser);
router.patch('/users/me', patchUser);
router.patch('/users/me/avatar', patchUserAvatar);

module.exports = router;
