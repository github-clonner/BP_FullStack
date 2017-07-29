import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, isAuthenticated, account, ...rest }) =>
  <Route
    {...rest}
    render={props => (
      isAuthenticated
      ? (
        <Component {...props} account={account} />
      )
      : (<Redirect to={{ pathname: '/signin', state: { from: props.location } }} />)
    )}
  />

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  account: PropTypes.object,
  location: PropTypes.object,
}

export default PrivateRoute
