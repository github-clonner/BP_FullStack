// @flow

import {
  AUTH_FAILURE,
  AUTH_ATTEMPT,
  AUTH_SUCCESS,
  CLEAR_MESSAGES,
} from '../actions/types'

const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_FAILURE:
      return {
        error: action.payload,
      }
    case AUTH_SUCCESS:
      return {
        success: action.payload,
      }
    case AUTH_ATTEMPT:
      return {
        info: action.payload,
      }
    case CLEAR_MESSAGES:
      return {}
    default:
      return state
  }
}

export default messagesReducer
