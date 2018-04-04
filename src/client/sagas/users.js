import { call, put, select, takeEvery, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'

/**
 * @desc Get all users
 * @return {void}
 */
export function * getUsers () {
  try {
    yield put({ type: 'GET_USER_SUCCESS' })
  } catch (e) {
    console.log(e)
  }
}

/**
 * @desc action watchers for nations saga
 * @return {void}
 */
export default function * watchNationUpdate () {
  yield all([yield takeEvery('GET_USERS', getUsers)])
}
