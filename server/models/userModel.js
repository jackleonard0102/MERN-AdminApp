const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      default: 'User',
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    permission: {
      type: Number,
      default: 2, // 1 for admin, 2 for regular user
    },
    socketId: {
      type: [String],
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
