// @flow

import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOutUser } from '../actions'
import { APP_NAME } from '../config'

import {
  FEATURES,
  SECRET_PAGE,
} from '../routes'

class Nav extends Component {
  renderNavAccount() {
    if (this.props.isAuthenticated) {
      return (
        <li className="dropdown">
          <a href="#" data-toggle="dropdown" className="dropdown-toggle">
            {this.props.account.email}
            <i className="caret"></i>
          </a>
            <ul className="dropdown-menu">
              <li><NavLink to="/account" activeStyle={{ color: '#fec503' }}>My Account</NavLink></li>
              <br />
              <li><a href="" onClick={this.props.signout.bind(this)}>Sign out</a></li>
            </ul>
        </li>
      )
    }
    else {
      return [
        <li className="nav-item" key={2}>
          <NavLink to="/signin" activeStyle={{ color: '#fec503' }} exact>Sign in</NavLink>
        </li>,
        <li className="nav-item" key={3}>
          <NavLink to="/signup" activeStyle={{ color: '#fec503' }} exact>Sign up</NavLink>
        </li>,
      ]
    }
  }

  render() {
    const mainLinks = ([
      { route: FEATURES, label: 'Features' },
      { route: SECRET_PAGE, label: 'Protected Page' },
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
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
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

const mapDispatchToProps = dispatch => ({
  signout: () => { dispatch(signOutUser()) },
})

export default connect(null, mapDispatchToProps)(Nav)
