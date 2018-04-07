import {
  WORKSPACE_CREATE,
  WORKSPACE_CREATE_SUCCESS,
  WORKSPACE_CREATE_FAIL,
  WORKSPACE_FETCH,
  WORKSPACE_FETCH_SUCCESS,
  SEND_EMAIL,
} from '../reducers/workspaces'

export function createWorkspace (values) {
  return {
    type: WORKSPACE_CREATE,
    values,
  }
}

export function fetchWorkspaces () {
  return {
    type: WORKSPACE_FETCH,
  }
}

export function sendEmail (email) {
  return {
    type: SEND_EMAIL,
    email,
  }
}
