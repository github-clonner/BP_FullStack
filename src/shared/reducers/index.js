import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import authReducer from './auth_reducer'
import messagesReducer from './messages_reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  messages: messagesReducer,
  router: routerReducer,
  toastr: toastrReducer
})

export default rootReducer
