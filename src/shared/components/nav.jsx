// @flow

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signOutUser } from '../actions'
import { APP_NAME } from '../config'

import {
  FEATURES,
  SECRET_PAGE
} from '../routes'

class Nav extends Component {
  static defaultProps: Object
  renderNavAccount() {
    if (this.props.isAuthenticated) {
      return (
        <li className="dropdown">{
          // eslint-disable-next-line
          }<a href="#" data-toggle="dropdown" className="dropdown-toggle">
            {this.props.account.email}
            <i className="caret" />
          </a>
          <ul className="dropdown-menu">
            <li><NavLink to="/account" activeStyle={{ color: '#fec503' }}>My Account</NavLink></li>
            <br />
            <li><a href="" onClick={this.props.signOut}>Sign out</a></li>
          </ul>
        </li>
      )
    }
    return [
      <li className="nav-item" key={2}>
        <NavLink to="/signin" activeStyle={{ color: '#fec503' }} exact>Sign in</NavLink>
      </li>,
      <li className="nav-item" key={3}>
        <NavLink to="/signup" activeStyle={{ color: '#fec503' }} exact>Sign up</NavLink>
      </li>
    ]
  }

  render() {
    const mainLinks = ([
      { route: FEATURES, label: 'Features' },
      { route: SECRET_PAGE, label: 'Protected Page' }
    ].map(link => (
      <li key={link.route}>
        <NavLink to={link.route} activeStyle={{ color: '#fec503' }} exact>{link.label}</NavLink>
      </li>
    )))

    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" data-toggle="collapse" data-target="#navbar" className="navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <NavLink to="/" className="navbar-brand">{ APP_NAME }</NavLink>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              { mainLinks }
            </ul>
            <ul className="nav navbar-nav navbar-right">
              { this.renderNavAccount() }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  account: PropTypes.shape({
    account: PropTypes.string,
    email: PropTypes.string,
    profile: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string
    })
  })
}

Nav.defaultProps = {
  account: {
    account: '',
    email: '',
    profile: {
      firstName: '',
      lastName: ''
    }
  }
}

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(signOutUser())
  }
})

export default connect(null, mapDispatchToProps)(Nav)
