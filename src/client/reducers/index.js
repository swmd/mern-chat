import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import users from './users'
import workspaces from './workspaces'

const rootReducer = combineReducers({
  users,
  workspaces,
  form: formReducer,
  toastr: toastrReducer,
})

export default rootReducer
