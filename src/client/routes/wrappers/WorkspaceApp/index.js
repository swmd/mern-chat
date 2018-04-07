import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from '../../Login'
import Register from '../../Register'

const WorkspaceApp = props => {
  console.log('props: ', props)
  const path = props.match.url
  return (
    <Switch>
      <Route path={`${path}/login`} component={Login} />
      <Route path={`${path}/register`} component={Register} />
    </Switch>
  )
}

export default WorkspaceApp
