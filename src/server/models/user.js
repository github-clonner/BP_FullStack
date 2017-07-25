const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const NORMAL = require('../members').NORMAL
const PREMIUM = require('../members').PREMIUM

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String },
  },
  account: {
    type: String,
    enum: [NORMAL, PREMIUM],
    default: NORMAL
  },
  stripe: {
    customerId: { type: String },
    subscriptionId: { type: String },
    lastFour: { type: String },
    plan: { type: String },
    activeUntil: { type: Date }
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
});

userSchema.pre('save', function (next) {

  const user = this;
  // return if not modified
  if (!user.isModified('password')) {
    return next();
  }
  // bcrypt.genSalt(rounds, cb)
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    // bcrypt.hash(data, salt, progress, cb)
    bcrypt.hash(user.password, salt, null, function (hashErr, hash) {
      if (hashErr) {
        return next(hashErr);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const ModelClass = mongoose.model('chickens', userSchema);

module.exports = ModelClass;
