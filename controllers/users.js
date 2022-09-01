const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      const {
        name, about, avatar, _id,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Неверный идентификатор'));
        return;
      }
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.postUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    if (email) {
      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name, about, avatar, email, password: hash,
          })
            .then((user) => res.send({
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              email: user.email,
              id: user._id,
            }))
            .catch((err) => {
              if (err.name === 'ValidationError') {
                next(new ValidationError('Некорректные данные'));
                return;
              }
              if (err.code === 11000) {
                next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
              }
              next(err);
            });
        });
    } else {
      throw new ValidationError('Некорректные данные');
    }
  } catch (err) {
    next(err);
  }
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => res.send({ name: user.name, about: user.about }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then((user) => res.send({ avatar: user.avatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new UnauthorizedError('Неправильные почта или пароль');
    })
    .then((user) => {
      if (!user) {
        return Promise.reject(new ValidationError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ValidationError('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, 'super-giga-mega-secret-key', { expiresIn: '7d' });
          res.cookie('token', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
          res.send({ message: 'Пользователь авторизован' });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Неверный идентификатор пользователя');
    })
    .then((user) => {
      const {
        name, about, avatar, _id,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Неверный идентификатор'));
        return;
      }
      next(err);
    });
};
