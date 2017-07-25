// @flow
import passport from 'passport'
import { ExtractJwt } from 'passport-jwt'

import Authentication from './controllers/auth_controller'
import passportService from './services/passport'

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

import {
  homePage,
  features,
  secretPage,
} from './controller'

import {
  HOME_PAGE_ROUTE,
  SIGN_IN,
  SECRET_PAGE,
  SIGN_UP,
  UPDATE_PROFILE,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  FEATURES,
} from '../shared/routes'

import renderApp from './render-app'

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

  // app.get(HELLO_PAGE_ROUTE, (req, res) => {
  //   res.send(renderApp(req.url, helloPage()))
  // })

  app.get(FEATURES, (req, res) => {
    res.send(renderApp(req.url, features()))
  })
  
  app.get(SECRET_PAGE, requireAuth, (req, res) => {
    res.send(renderApp(req.url, secretPage()))
  })

  // app.get(HELLO_ASYNC_PAGE_ROUTE, (req, res) => {
  //   res.send(renderApp(req.url, helloAsyncPage()))
  // })

  // app.get(helloEndpointRoute(), (req, res) => {
  //   res.json(helloEndpoint(req.params.num))
  // })

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
