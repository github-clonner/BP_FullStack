// @flow

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import history from './history'
import App from '../shared/app'
import reducers from '../shared/reducers'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'

// // eslint-disable-next-line flow-disable-next-line
import '../assets/stylesheets/main.scss'

const middlewareHistory = routerMiddleware(history)

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const preloadedState = window.__PRELOADED_STATE__
/* eslint-enable no-underscore-dangle */

delete window.__PRELOADED_STATE__

const store = createStore(reducers, preloadedState,
  composeEnhancers(applyMiddleware(thunkMiddleware, middlewareHistory)))

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

// const token = localStorage.getItem(APP_NAME)
// if (token) {
//   store.dispatch({LoginCheckAction})
// }

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </ConnectedRouter>
  </Provider>)

ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('../shared/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../shared/app').default
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}
