const moongose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcryptjs');

const userSchema = new moongose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(https?:\/\/)(www\.)?([a-zA-Z0-9._~:/?%#\[\]@!$&'()*+,;=-]+\/?)(#[a-zA-Z0-9._~:/?%#\[\]@!$&'()*+,;=-]*)?$/.test(
          value
        );
      },
      message: (props) => `${props.value} is not a valid url !`,
    },
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: validator.isEmail,
    message: (props) => `${props.value} is not a valid email !`,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }

        return user;
      });
    });
};

module.exports = moongose.model('user', userSchema);
