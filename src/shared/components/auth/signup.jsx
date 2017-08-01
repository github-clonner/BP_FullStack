// @flow

import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import Modal from 'react-modal'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as actions from '../../actions'
import Messages from '../pages/auth_messages'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  content: {
    position: 'absolute',
    top: '25vh',
    left: '20vw',
    right: '20vw',
    bottom: '25vh',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '5px',
    fontSize: '20px',
    outline: 'none',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

class Signup extends Component {
  static defaultProps: Object

  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  state: {
    modalIsOpen: boolean
  }

  componentWillUnmount() {
    this.props.clearMessages()
  }

  openModal: Function
  closeModal: Function
  handleFormSubmit: Function

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps)
  }

  // eslint-disable-next-line
  renderInput(field) {
    return (
      <div>
        <input
          {...field.input}
          className={field.className}
          placeholder={field.placeholder}
          type={field.type}
          value={field.input.value}
        />
        { field.meta.touched && field.meta.error &&
        <span className="error">&#9888;{field.meta.error}</span> }
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props
    const title = 'Sign up'

    return (
      <div id="signup" className="container auth-container">
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: 'Sign up' },
            { property: 'og:title', content: title }
          ]}
        />
        <div className="panel">
          <div className="panel-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div className="text-center auth-top">
                Sign up
              </div>
              <br />
              <div className="auth-flexcontainer">
                <fieldset className="form-group">
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    component={this.renderInput}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="form-control"
                    component={this.renderInput}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="form-control"
                    component={this.renderInput}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password (at least 8 characters)"
                    className="form-control"
                    component={this.renderInput}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <Field
                    type="password"
                    name="passwordConfirm"
                    placeholder="Confirm your password"
                    className="form-control"
                    component={this.renderInput}
                  />
                </fieldset>
                <br />
                <button action="submit" className="btn btn-success btn-signup">Create my account </button>
                <br />
                <div className="form-group">
                  <small className="text-muted">
                    By signing up, you agree to the
                    <button className="btn btn-link" onClick={this.openModal}>Terms of Service</button>
                    <Modal
                      isOpen={this.state.modalIsOpen}
                      onRequestClose={this.closeModal}
                      style={customStyles}
                      contentLabel="Modal"
                    >
                      <div>Terms of Service</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus placerat dui et purus hendrerit, 
                        ultricies tincidunt metus hendrerit. Vivamus fringilla ornare convallis. Maecenas in molestie odio, 
                        id auctor diam. Nulla finibus ligula sed elit tristique, nec iaculis mauris lacinia. Duis sagittis 
                        metus nisl, sit amet tincidunt diam rutrum non. Quisque a volutpat sem. Vestibulum velit mi, malesuada 
                        ut lacinia iaculis, fringilla ut urna. Vivamus ante magna</p>
                      <button className="btn btn-primary" onClick={this.closeModal}>close</button>
                    </Modal>
                  </small>
                </div>
                <div className="form-group">
                  <small className="text-muted">Already have an account? <NavLink to="/signin" exact>Sign in</NavLink></small>
                </div>
              </div>
              <Messages messages={this.props.messages} />
            </form>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  messages: PropTypes.shape({
    success: PropTypes.array,
    failure: PropTypes.array,
    info: PropTypes.array
  })
}

Signup.defaultProps = {
  messages: {
    success: [],
    failure: [],
    info: []
  }
}

function validate(formProps) {
  const errors = {}

  if (!formProps.email) {
    errors.email = 'Please enter an Email'
  }
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }
  else if (formProps.password.length < 8) {
    errors.password = 'Please create a password longer than 8 characters'
  }
  else if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm your password'
  }
  else if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }
  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, messages: state.messages }
}


export default reduxForm({
  form: 'signup',
  validate
})(connect(mapStateToProps, actions)(Signup))
