const router = require('express').Router();
const {
  getCards, postCard, deleteCard, setLike, removeLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', postCard);
router.delete('/cards/:_id', deleteCard);
router.put('/cards/:_id/likes', setLike);
router.delete('/cards/:_id/likes', removeLike);

module.exports = router;
