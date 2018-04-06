/* eslint-disable */

import { all } from 'redux-saga/effects'

import users from './users'
import workspaces from './workspaces'

export default function* rootSaga() {
  yield all([users(), workspaces()])
}
