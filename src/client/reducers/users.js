import { WORKSPACE_CREATE_SUCCESS } from '../workspaces'

const initialState = {
  currentUser: null,
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case WORKSPACE_CREATE_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
      }
    default:
      return state
  }
}
