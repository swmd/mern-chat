export const WORKSPACE_CREATE = 'WORKSPACE_CREATE'
export const WORKSPACE_CREATE_SUCCESS = 'WORKSPACE_CREATE_SUCCESS'
export const WORKSPACE_CREATE_FAIL = 'WORKSPACE_CREATE_FAIL'
export const WORKSPACE_FETCH = 'WORKSPACE_FETCH'
export const WORKSPACE_FETCH_SUCCESS = 'WORKSPACE_FETCH_SUCCESS'

const initialState = {
  workspaces: [],
  currentWorkspace: {},
}

export default function workspaces (state = initialState, action) {
  switch (action.type) {
    case WORKSPACE_CREATE_SUCCESS:
      return {
        ...state,
        currentWorkspace: action.workspace,
      }
    case WORKSPACE_FETCH_SUCCESS:
      return {
        ...state,
        workspaces: action.workspaces,
      }
    case WORKSPACE_CREATE_FAIL:
    default:
      return state
  }
}
