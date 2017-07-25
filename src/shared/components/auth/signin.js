import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as actions from '../../actions/index'
import Messages from '../pages/auth_messages'
import Helmet from 'react-helmet'

class Signin extends Component {

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password })
  }
  
  componentWillUnmount(){
    this.props.clearMessages()
  }

  renderInput (field) {
    return (
      <div>
        <input {...field.input} className={field.className} placeholder={field.placeholder} type={field.type} />
        { field.meta.touched && field.meta.error &&
        <span className="error">&#9888; {field.meta.error}</span> }
      </div>
    );
  }
  
  render() {
    const { handleSubmit } = this.props;
    const title = 'Sign in'
    return (
      <div id="signin" className="container auth-container">
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: 'Sign in' },
            { property: 'og:title', content: title },
          ]}
        />
        <div className="panel">
          <div className="panel-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="text-center auth-top">
                Sign in
              </div>
              <br />
              <div className="auth-flexcontainer">
                <fieldset className="form-group">
                  <Field
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Email"
                    component={this.renderInput}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Field
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    component={this.renderInput}
                  />
                </fieldset>
                <br />
                <button action="submit" className="form-group btn btn-success btn-signin">Sign in</button>
                <br />
                <p className="form-group signin-forgot">
                  <NavLink to="/forgot_password" exact><strong>Forgot your password?</strong></NavLink>
                </p>
                <br />
                <div className="form-group auth-messages">
                  <Messages messages={this.props.messages}/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Please enter an Email';
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  return errors;
}

export default reduxForm({
  form: 'signin', 
  validate
})(connect(mapStateToProps, actions)(Signin));
