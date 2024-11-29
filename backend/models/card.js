import mongoose from 'mongoose';

const { Schema } = mongoose;

const urlRegex =
  /^(https?:\/\/)(www\.)?([a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]+)$/;

const cardSchema = new Schema(
  {
    name: {
      required: true,
      minlength: 2,
      maxlength: 30,
      type: String,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return urlRegex.test(v);
        },
        message: (props) => `${props.value} El URL no es valido`,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
  },
  { timestamps: true }
);

const Card = mongoose.model('card', cardSchema);
export default Card;
