// @flow
import passport from 'passport'
import renderApp from './render-app'
import Authentication from './controllers/auth_controller'
// eslint-disable-next-line
import passportService from './services/passport'

import {
  homePage,
  features,
  secretPage
} from './controller'

import {
  HOME_PAGE_ROUTE,
  SIGN_IN,
  SECRET_PAGE,
  SIGN_UP,
  UPDATE_PROFILE,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  FEATURES
} from '../shared/routes'

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

export default (app: Object) => {
  // Auth
  app.post(SIGN_IN, requireSignin, Authentication.signin)
  app.post(SIGN_UP, Authentication.signup)
  app.post(UPDATE_PROFILE, requireAuth, Authentication.updateProfile)
  app.post(FORGOT_PASSWORD, Authentication.forgotPassword)
  app.post(RESET_PASSWORD, Authentication.resetPassword)

  app.get(HOME_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, homePage()))
  })

  app.get(FEATURES, (req, res) => {
    res.send(renderApp(req.url, features()))
  })

  app.get(SECRET_PAGE, requireAuth, (req, res) => {
    res.send(renderApp(req.url, secretPage()))
  })

  app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url))
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error('error: ', err.stack)
    res.status(500).send('Something went wrong!')
  })
}
