import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import * as actions from '../../actions/index'
import Messages from '../pages/auth_messages'

class Forgot extends Component {

  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillUnmount() {
    this.props.clearMessages()
  }

  handleFormSubmit({ email }) {
    this.props.forgotPassword({ email })
  }

  // eslint-disable-next-line
  renderInput(field) {
    return (
      <div>
        <input
          {...field.input}
          placeholder={field.placeholder}
          className={field.className}
          type={field.type}
        />
        { field.meta.touched && field.meta.error &&
        <span className="error">&#9888; {field.meta.error}</span> }
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props
    const title = 'Forgotten Password'
    return (
      <div id="forgot" className="container auth-container">
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: 'Forgotten Password' },
            { property: 'og:title', content: title }
          ]}
        />
        <div className="panel">
          <div className="panel-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div className="text-center auth-top">
                Forgotten Password
              </div>
              <br />
              <div className="auth-flexcontainer">
                <fieldset className="form-group">
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Your registered email address"
                    name="email"
                    component={this.renderInput}
                  />
                </fieldset>
                <button action="submit" className="btn btn-success btn-forgot">Submit</button>
                <br />
                <div className="form-group">
                  <p className="text-left">Reset tokens are valid for up to for 24 hours</p>
                </div>
                <br />
                <div className="form-group auth-messages">
                  <Messages messages={this.props.messages} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Forgot.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  messages: PropTypes.shape({
    success: PropTypes.array,
    failure: PropTypes.array,
    info: PropTypes.array
  })
}

Forgot.defaultProps = {
  messages: {
    success: [],
    failure: [],
    info: []
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  }
}

function validate(formProps) {
  const errors = {}
  if (!formProps.email) {
    errors.email = 'Please enter an Email'
  }
  return errors
}

export default reduxForm({
  form: 'forgot',
  validate
})(connect(mapStateToProps, actions)(Forgot))
