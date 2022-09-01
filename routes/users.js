const router = require('express').Router();
const {
  getUser, getUsers, patchUser, patchUserAvatar, getUserMe,
} = require('../controllers/users');

router.get('/users/me', getUserMe);
router.get('/users', getUsers);
router.get('/users/:_id', getUser);
router.patch('/users/me', patchUser);
router.patch('/users/me/avatar', patchUserAvatar);

module.exports = router;
