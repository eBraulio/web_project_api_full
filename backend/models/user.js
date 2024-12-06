const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { Schema } = mongoose;

const urlRegex =
  /^(https?:\/\/)(www\.)?([a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]+)$/;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau MU', //url from project instructions
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador MU', //url from project instructions
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} El URL no es valido MU`,
    },
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg', //url from project instructions
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: validator.isEmail,
    message: (props) => `${props.value} no es correo válido MU!`,
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
  return this.findOne({ email }).then((user) => {
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

// userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
//   return this.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error('Incorrect email or password'));
//       }

//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new Error('Incorrect email or password'));
//           }

//           return user;
//         });
//     });
// };

// const User = mongoose.model('user', userSchema);
// export default User;

module.exports = mongoose.model('user', userSchema);
