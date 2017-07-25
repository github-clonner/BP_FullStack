import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions/index'
import Messages from '../pages/auth_messages'
import { NavLink } from 'react-router-dom'

class Account extends Component {

  componentWillUnmount() {
    this.props.clearMessages()
  }

  handleFormSubmit({account: {profile: {firstName}}, account: {profile: {lastName}}}) {
    this.props.updateProfile({ firstName, lastName })
  }

  renderInput (field) {
    return (
      <div>
        <input {...field.input} className={field.className} type={field.type} />
        { field.meta.touched && field.meta.error &&
        <span className="error"> &#9888; {field.meta.error}</span> }
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props
    const title = 'Account'
    return (
      <div id="account" className="container auth-container">
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: 'Account' },
            { property: 'og:title', content: title },
          ]}
        />
        <div className="panel">
          <div className="panel-body">
            <form className="form-horizontal" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="text-center auth-top">
                Account Information
              </div>
              <br />
              <br />
              <div className="auth-flexcontainer auth-flexcontainer-account">
                <div className="form-group">
                  <label htmlFor="email" className="col-sm-4">Email</label>
                  <div className="col-sm-8">
                    <div>{ this.props.account.email }</div>
                  </div>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="account" className="col-sm-4">Account Type</label>
                  <div className="col-sm-8">
                    <div> {this.props.account.account}</div>
                  </div>
                </div>
                <br />
                <fieldset className="form-group">
                  <label htmlFor="firstName" className="col-sm-4">First Name</label>
                  <div className="col-sm-8">
                    <Field
                      className="form-control"
                      type="firstName"
                      name="account.profile[firstName]"
                      component={this.renderInput}
                    />
                  </div>
                </fieldset>
                <br />
                <fieldset className="form-group">
                  <label htmlFor="lastName" className="col-sm-4">Last Name</label>
                  <div className="col-sm-8">
                    <Field
                      className="form-control"
                      type="lastName"
                      name="account.profile[lastName]"
                      component={this.renderInput}
                    />
                  </div>
                </fieldset>
                <br />
                <div className="form-group">
                  <small className="text-muted col-sm-12">
                    Need to reset your password? <NavLink to="/forgot_password" exact><strong>Password Reset</strong></NavLink>
                  </small>
                </div>
                <br />
                <button action="submit" className="btn btn-success btn-account">Update your profile</button>
                <br />
                <br />
                <Messages messages={this.props.messages} />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {account: {profile: {firstName: '', lastName: ''}}}
  if (!formProps.account.profile.firstName) {
    errors.account.profile.firstName = 'Please enter a first name';
  }
  if (!formProps.account.profile.lastName) {
    errors.account.profile.lastName = 'Please enter a last name';
  }
  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      account: ownProps.account,
    },
    messages: state.messages, 
  }
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'account',
  enableReinitialize: true,
  validate,
}, mapStateToProps)(Account))
