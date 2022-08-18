const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
    default: [],
  },
  cratedAt: {
    type: Date,
    required: true,
    minlength: 2,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
