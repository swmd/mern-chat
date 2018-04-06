import { call, put, select, takeEvery, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {
  WORKSPACE_CREATE,
  WORKSPACE_CREATE_SUCCESS,
  WORKSPACE_CREATE_FAIL,
  WORKSPACE_FETCH,
  WORKSPACE_FETCH_SUCCESS,
} from '../reducers/workspaces'
import API from '../services/api'
import { ENDPOINT } from '../services/constants'

export function * fetchWorkspaces () {
  try {
    const workspaces = yield call(API.get, ENDPOINT.GET_WORKSPACE)
    console.log('workspaces: ', workspaces)
    yield put({ type: WORKSPACE_FETCH_SUCCESS, workspaces })
  } catch (e) {
    console.log(e)
  }
}

export function * createWorkspace (action) {
  try {
    const newWorkspace = yield call(
      API.post,
      ENDPOINT.CREATE_WORKSPACE,
      action.values
    )
    console.log('New: ', newWorkspace)
    yield put({
      type: WORKSPACE_CREATE_SUCCESS,
      workspace: newWorkspace.workspace._doc,
      user: newWorkspace.user._doc,
    })
    yield put({ type: WORKSPACE_FETCH })
  } catch (e) {
    console.log('create error: ', e)
  }
}

export default function * watchWorkspaces () {
  yield all([
    yield takeEvery(WORKSPACE_FETCH, fetchWorkspaces),
    yield takeEvery(WORKSPACE_CREATE, createWorkspace),
  ])
}
