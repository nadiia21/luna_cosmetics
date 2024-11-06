const mongoose = require('mongoose');

const emailValidator = [
  {
    validator: (v) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(v);
    },
    message: (props) => `${props.value} is not a valid email!`,
  },
];

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  profileImage: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
