import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import users from './users'
import workspaces from './workspaces'

const rootReducer = combineReducers({
  users,
  workspaces,
  form: formReducer,
})

export default rootReducer
