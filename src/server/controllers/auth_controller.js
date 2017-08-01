import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import User from '../models/user'
import mailgun from '../services/mailgun'
import { SECRET, APP_NAME } from '../../shared/config'
import { logger } from '../services/logger'

function tokenForUser(user) {
  const payload = {
    iss: APP_NAME,
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  }
  return jwt.sign(payload, SECRET, (err, token) => {
    if (err) {
      logger.error(`Error tokenForUser: ${err}`)
    }
    return token
  })
}

exports.signin = (req, res) => {
  // user auth'd. give them a token
  const primaryInfo = {
    email: req.user.email,
    account: req.user.account,
    profile: {
      firstName: req.user.profile.firstName,
      lastName: req.user.profile.lastName
    }
  }
  logger.info(`Success signin : ${req.user.email}`)
  res.status(200).json({
    token: tokenForUser(req.user),
    primaryinfo: primaryInfo
  })
}

exports.resetPassword = (req, res) => {
   // eslint-disable-next-line
  User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, (err, resetUser) => {
    if (err) {
      logger.error(`Error resetPassword DB FindOne: ${err}`)
      return res.status(422).send({ error: 'Oops! There was an issue finding that user. Try again later or contact support' })
    }
    if (!resetUser) {
      return res.status(422).send({ error: 'Your token has expired or is invalid. Please request a new forgotten token.' })
    }
    resetUser.password = req.body.newPassword
    resetUser.resetPasswordToken = undefined
    resetUser.resetPasswordExpires = undefined

    return resetUser.save((resetErr) => {
      if (resetErr) {
        logger.error(`Error resetPassword DB Save: ${resetErr}`)
        return res.send(422).json({ error: 'Error saving user' })
      }

      const message = {
        subject: `${APP_NAME} Password Change Successful`,
        text: 'Hello! You are receiving this email because you changed your password recently. \n\n' +
          'If you did not request this change, please contact us immediately'
      }
      return mailgun.sendEmail(resetUser.email, message)
        .then((mailgunResp) => {
          logger.info(`Success resetPassword Mailgun: ${mailgunResp}`)
          res.status(200).json({ success: 'Password successfully changed. Please login with your new password.' })
        })
        .catch((mailgunErr) => {
          logger.error(`Error resetPassword Mailgun: ${mailgunErr}`)
          res.status(422).json({ error: 'Oops something went wrong dispatching to your email.  Please contact support' })
        })
    })
  })
}

exports.forgotPassword = (req, res) => {
  const email = req.body.email
  User.findOne({ email }, (err, existingUser) => {
    if (err || existingUser == null) {
      logger.error(`Error forgotPassword findOne: ${err}`)
      return res.status(422).json({ error: 'Oops! We couldn\'t find that user!' })
    }
    return crypto.randomBytes(48, (cryptoErr, buffer) => {
      const resetToken = buffer.toString('hex')
      if (cryptoErr) {
        logger.error(`Error forgotPassword Crypto: ${cryptoErr}`)
        return res.send(422).json({ error: 'Oops! Something went wrong generating a token! Please contact support' })
      }

      existingUser.resetPasswordToken = resetToken
      existingUser.resetPasswordExpires = Date.now() + 3600000

      return existingUser.save((UserSaveErr) => {
        if (UserSaveErr) {
          logger.error(`Success forgotPassword DB Save: ${UserSaveErr}`)
          return res.send(422).json({ error: 'Error saving your user token. Please contact support' })
        }
        const message = {
          subject: 'Reset Password',
          text: `${'You are receiving this because you (or someone else) had requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://'}${req.headers.host}/reset_password/${resetToken}\n\n` +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        }
        return mailgun.sendEmail(existingUser.email, message)
          .then((mailgunResp) => {
            logger.info(`Success forgotPassword Mailgun: ${mailgunResp}`)
            res.status(200).json({ success: 'Please check your email for the link to reset your password.' })
          })
          .catch((mailgunErr) => {
            logger.error(`Error forgotPassword Mailgun: ${mailgunErr}`)
            res.status(422).json({ error: 'Oops something went wrong dispatching to your email.  Please contact support' })
          })
      })
    })
  })
}

exports.updateProfile = (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  if (!firstName || !lastName) {
    return res.status(422).json({ error: 'Please provide a first and last name' })
  }
  return User.findById(req.user.id, (err, user) => {
    if (err || user === null) {
      logger.error(`Error updateProfile DB FindOne: ${err}`)
      return res.status(422).json({ error: 'An error occurred finding that user' })
    }
    user.profile.firstName = firstName
    user.profile.lastName = lastName
    return user.save((saveErr) => {
      if (saveErr) {
        logger.error(`Error updateProfile DB Save: ${saveErr}`)
        return res.status(422).json({ error: 'An error occured saving your profile' })
      }
      const primaryInfo = {
        email: user.email,
        account: user.account,
        profile: {
          firstName: user.profile.firstName,
          lastName: user.profile.lastName
        }
      }
      return res.status(200).json({ primaryInfo })
    })
  })
}

exports.signup = (req, res, next) => {
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const password = req.body.password

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password' })
  }

  return User.findOne({ email }, (err, existingUser) => {
    if (err) {
      logger.error(`Error signup DB FindOne: ${err}`)
      return next(err)
    }
    if (existingUser) {
      return res.status(422).send({ error: 'That email is already in use' })
    }
    const user = new User({
      email,
      password,
      profile: { firstName, lastName }
    })
    return user.save((saveErr, savedUser) => {
      if (saveErr) {
        logger.error(`Error signup DB Save: ${saveErr}`)
        return next(saveErr)
      }
      const message = { subject: `Welcome to ${APP_NAME}!`, text: 'Thanks for signing up!' }

      return mailgun.sendEmail(savedUser.email, message)
        .then((response) => {
          res.status(201).json({
            token: tokenForUser(savedUser),
            primaryinfo: savedUser
          })
          logger.info(`Success signup Mailgun: ${response}`)
        })
        .catch((mailGunErr) => {
          // eslint-disable-next-line
          logger.error(`Error signup Mailgun: ${mailGunErr}`)
          return res.status(422).json({
            error: 'Signed up! But there was an issue with your email.  We\'ll send a confirmation again soon.' })
        })
      // if no mailgun, uncomment and delete 165-179 if no mailgun
      // res.status(201).json({
      //   token: tokenForUser(savedUser),
      //   primaryinfo: savedUser
      // })
    })
  })
}

