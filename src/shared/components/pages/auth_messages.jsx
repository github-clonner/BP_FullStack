/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'

class Messages extends React.Component {
  render() {
    return this.props.messages.success ? (
      <div role="alert" className="alert alert-success">
        {this.props.messages.success.map((message, index) => <div key={index}>{message.success}</div>)}
      </div>
    ) : this.props.messages.error ? (
      <div role="alert" className="alert alert-danger">
        {this.props.messages.error.map((message, index) => <div key={index}>{message.error}</div>)}
      </div>
    ) : this.props.messages.info ? (
      <div role="alert" className="alert alert-info">
        {this.props.messages.info.map((message, index) => <div key={index}>{message.info}</div>)}
      </div>
    ) : null
  }
}

Messages.propTypes = {
  messages: PropTypes.shape({
    success: PropTypes.array,
    info: PropTypes.array,
    failure: PropTypes.array
  })
}

Messages.defaultProps = {
  messages: {
    success: [],
    info: [],
    failure: []
  }
}

export default Messages

