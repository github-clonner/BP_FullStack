import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import Messages from '../pages/auth_messages'
import Helmet from 'react-helmet'

class Reset extends Component {

  componentWillUnmount(){
    this.props.clearMessages()
  }

  handleFormSubmit({ newPassword }) {
    this.props.resetPassword({ newPassword, token: this.props.match.params.id })
  }
  
  renderInput (field) {
    return (
      <div>
        <input {...field.input} placeholder={field.placeholder} className={field.className} type={field.type} />
        { field.meta.touched && field.meta.error &&
        <span className="error">&#9888; {field.meta.error}</span> }
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const title = 'Reset'
    return (
      <div id="reset" className="container auth-container">
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: 'Reset' },
            { property: 'og:title', content: 'Reset' },
          ]}
        />
        <div className="panel">
          <div className="panel-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="text-center auth-top">
                Reset your password
              </div>
              <br />
              <div className="auth-flexcontainer">
                <fieldset className="form-group">
                  <Field
                    className="form-control"
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    component={this.renderInput}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Field
                    className="form-control"
                    type="password"
                    name="newPasswordConfirm"
                    placeholder="Confirm your password"
                    component={this.renderInput}
                  />
                </fieldset>
                <button action="submit" className="btn btn-success btn-reset">Reset your password</button>
                <br />
                <br />
                <div className="form-group auth-messages">
                  <Messages messages={this.props.messages}/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.newPassword) {
    errors.newPassword = 'Please enter a password'
  }
  else if (formProps.newPassword.length < 8) {
    errors.newPassword = 'Please create a password longer than 8 characters'
  }
  else if (!formProps.newPasswordConfirm) {
    errors.newPasswordConfirm = 'Please confirm your password';
  }
  else if (formProps.newPassword !== formProps.newPasswordConfirm) {
    errors.newPasswordConfirm = 'Passwords must match';
  }
  return errors;
}

export default reduxForm({
  form: 'reset', 
  validate
})(connect(mapStateToProps, actions)(Reset));
