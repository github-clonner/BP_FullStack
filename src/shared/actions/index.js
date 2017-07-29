import 'isomorphic-fetch'
import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'

import {
  CLEAR_MESSAGES, SIGNIN_SUCCESS, SIGN_OUT, UPDATED_PROFILE,
  AUTH_ATTEMPT, AUTH_FAILURE, AUTH_SUCCESS
} from './types'

import { APP_NAME } from '../config'
import { SIGN_IN, SIGN_UP, UPDATE_PROFILE, RESET_PASSWORD, FORGOT_PASSWORD } from '../../shared/routes'

export const signinSuccess = createAction(SIGNIN_SUCCESS)
export const signOut = createAction(SIGN_OUT)
export const updatedProfile = createAction(UPDATED_PROFILE)
export const authAttempt = createAction(AUTH_ATTEMPT)
export const authFailure = createAction(AUTH_FAILURE)
export const clearMessages = createAction(CLEAR_MESSAGES)
export const authSuccess = createAction(AUTH_SUCCESS)

export function resetPassword({ newPassword, token }) {
  return (dispatch) => {
    dispatch(clearMessages())
    dispatch(authAttempt([{ info: 'Attempting to reset your password' }]))
    return fetch(RESET_PASSWORD, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newPassword, token })
    })
    .then((response) => {
      if (response.ok) {
        return response.json().then(() => {
          dispatch(authSuccess([{ success: 'Your password has been successfully reset!' }]))
        })
      }
      else if (response.status === 422) {
        return response.json().then((json) => {
          dispatch(authFailure([{ error: json.error }]))
        })
      }
      return dispatch(authFailure([{ error: 'Oops! Something went wrong. Please try again later or contact support' }]))
    })
  }
}

export function forgotPassword({ email }) {
  return (dispatch) => {
    dispatch(clearMessages())
    dispatch(authAttempt([{ info: 'Searching for your email..' }]))
    return fetch(FORGOT_PASSWORD, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    .then((response) => {
      if (response.ok) {
        return response.json().then(() => {
          dispatch(authSuccess([{ success: 'Great! We\'ve dispatched an email to you with further instructions!' }]))
        })
      }
      else if (response.status === 422) {
        return response.json().then((json) => {
          dispatch(authFailure([{ error: json.error }]))
        })
      }
      return dispatch(authFailure([{ error: 'Oops! Something went wrong.  Please try again later or contact support' }]))
    })
  }
}

export function updateProfile({ firstName, lastName }) {
  return (dispatch) => {
    dispatch(clearMessages())
    dispatch(authAttempt([{ info: 'Attempting to update your profile' }]))
    return fetch(UPDATE_PROFILE, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem(APP_NAME)
      },
      body: JSON.stringify({ firstName, lastName })
    })
    .then((response) => {
      if (response.ok) {
        return response.then((json) => {
          dispatch(updatedProfile(json.primaryInfo))
          dispatch(authSuccess([{ success: 'Great! Profile Updated.' }]))
        })
      }
      else if (response.status === 422) {
        return response.json().then((json) => {
          dispatch(authFailure([{ error: json.error }]))
        })
      }
      return dispatch(authFailure([{ error: 'Oops! Something went wrong. Try again later' }]))
    })
  }
}

export function signinUser({ email, password }) {
  return (dispatch) => {
    dispatch(clearMessages())
    dispatch(authAttempt([{ info: 'Attempting to sign you in' }]))
    return fetch(SIGN_IN, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          localStorage.setItem(APP_NAME, json.token)
          dispatch(signinSuccess(json.primaryinfo))
          dispatch(push('/secretpage'))
        })
      }
      return dispatch(authFailure([{ error: 'Oops! We couldn\'t find a successful match' }]))
    })
  }
}

export function signOutUser() {
  return (dispatch) => {
    localStorage.removeItem(APP_NAME)
    dispatch(push('/'))
    dispatch(signOut())
  }
}

export function signupUser({ email, firstName, lastName, password }) {
  return (dispatch) => {
    dispatch(clearMessages())
    dispatch(authAttempt([{ info: 'Attempting to sign you up' }]))
    return fetch(SIGN_UP, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstName, lastName, password })
    })
    .then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          localStorage.setItem(APP_NAME, json.token)
          dispatch(signinSuccess(json.primaryinfo))
          dispatch(push('/'))
        })
      }
      else if (response.status === 422) {
        return response.json().then((json) => {
          dispatch(authFailure([{ error: json.error }]))
        })
      }
      return dispatch(authFailure([{ error: 'Oops! We couldn\'t find a match with your password' }]))
    })
  }
}

