import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import { NORMAL, PREMIUM } from '../members'

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
    lastName: { type: String }
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
})

// eslint-disable-next-line        
userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  // bcrypt.genSalt(rounds, cb)
  // eslint-disable-next-line
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err)
    }
    // bcrypt.hash(data, salt, progress, cb)
    // eslint-disable-next-line
    bcrypt.hash(user.password, salt, null, function (hashErr, hash) {
      if (hashErr) {
        return next(hashErr)
      }
      user.password = hash
      next()
    })
  })
})

// eslint-disable-next-line        
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  // eslint-disable-next-line        
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err)
    }
    callback(null, isMatch)
  })
}

const ModelClass = mongoose.model('chickens', userSchema)

module.exports = ModelClass
