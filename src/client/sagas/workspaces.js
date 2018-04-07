import { call, put, select, takeEvery, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { toastr } from 'react-redux-toastr'
import {
  WORKSPACE_CREATE,
  WORKSPACE_CREATE_SUCCESS,
  WORKSPACE_CREATE_FAIL,
  WORKSPACE_FETCH,
  WORKSPACE_FETCH_SUCCESS,
  SEND_EMAIL,
} from '../reducers/workspaces'
import API from '../services/api'
import { ENDPOINT } from '../services/constants'

export function * fetchWorkspaces () {
  try {
    const workspaces = yield call(API.get, ENDPOINT.GET_WORKSPACE)
    // console.log('workspaces: ', workspaces)
    yield put({ type: WORKSPACE_FETCH_SUCCESS, workspaces })
  } catch (e) {
    console.log('fetch workspace error: ', e)
  }
}

export function * createWorkspace (action) {
  try {
    const newWorkspace = yield call(
      API.post,
      ENDPOINT.CREATE_WORKSPACE,
      action.values
    )
    // console.log('New: ', newWorkspace)
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

export function * sendEmail (action) {
  try {
    const result = yield call(API.post, ENDPOINT.SEND_EMAIL, {
      email: action.email,
    })
    if (result.error) {
      toastr.error('Email send error')
    } else {
      toastr.success('Email sent successfully')
    }
  } catch (e) {
    console.log('create error: ', e)
    toastr.error('Email send error')
  }
}

export default function * watchWorkspaces () {
  yield all([
    yield takeEvery(WORKSPACE_FETCH, fetchWorkspaces),
    yield takeEvery(WORKSPACE_CREATE, createWorkspace),
    yield takeEvery(SEND_EMAIL, sendEmail),
  ])
}
