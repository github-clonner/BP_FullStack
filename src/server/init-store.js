// @flow

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createMemoryHistory from 'history/createMemoryHistory'
import reducers from '../shared/reducers'

const middlewareHistory = routerMiddleware(createMemoryHistory())

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined
  return createStore(reducers, preloadedState, applyMiddleware(thunkMiddleware, middlewareHistory))
}

export default initStore
