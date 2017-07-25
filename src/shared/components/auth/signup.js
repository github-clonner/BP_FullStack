import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { NavLink } from 'react-router-dom'
import Messages from '../pages/auth_messages'
import Helmet from 'react-helmet'

class Signup extends Component {

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps)
  }

  componentWillUnmount(){
    this.props.clearMessages()
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  renderInput (field) {
    return (
      <div>
        <input {...field.input} className={field.className} placeholder={field.placeholder} type={field.type} value={field.input.value}/>
        { field.meta.touched && field.meta.error &&
        <span className="error">&#9888;{field.meta.error}</span> }
      </div>
    );
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
            { property: 'og:title', content: title },
          ]}
        />
        <div className="panel">
          <div className="panel-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
                  <small className="text-muted">By signing up, you agree to the <NavLink to="/tos" exact>Terms of Service</NavLink>.</small>
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
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an Email'
  }
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  else if (formProps.password.length < 8) {
    errors.password = 'Please create a password longer than 8 characters'
  }
  else if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm your password';
  }
  else if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, messages: state.messages };
}


export default reduxForm({
  form: 'signup',
  validate
})(connect(mapStateToProps, actions)(Signup));
