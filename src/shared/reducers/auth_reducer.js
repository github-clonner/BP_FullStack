import {
  SIGNIN_SUCCESS,
  SIGN_OUT,
  UPDATED_PROFILE,
} from '../actions/types'

const initialState = {
  authenticated: false,
  account: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return { ...state, authenticated: true, account: action.payload }
    case SIGN_OUT:
      return { ...state, authenticated: false }
    case UPDATED_PROFILE:
      return { ...state, account: action.payload }
  }
  return state
}
