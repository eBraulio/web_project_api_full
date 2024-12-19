const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorador',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(v) {
        const urlRegex =
          /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} no es un email válido!`,
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
    minlength: 6,
  },
});

module.exports = mongoose.model('user', userSchema);
