import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, account, ...rest}) => {
  return (
  <Route
    {...rest}
    render={props => (
      isAuthenticated
      ? (
         <Component {...props} account={account} />
      )
      : (<Redirect to={{ pathname: '/signin', state: { from: props.location} }} />)
    )}
  />
)}

export default PrivateRoute
