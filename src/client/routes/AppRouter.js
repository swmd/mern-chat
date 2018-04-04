import React from 'react'
import WorkspacePage from './workspace'
import Chat from './Chat'
import Login from './Login'
import Register from './Register'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppContainer from './AppContainer'

const AppRouter = () => (
  <Router>
    <AppContainer>
      <Route exact path='/' component={WorkspacePage} />
      <Route path='/login' component={Login} />
      <Route path='/chat' component={Chat} />
      <Route path='/register' component={Register} />
    </AppContainer>
  </Router>
)

export default AppRouter
