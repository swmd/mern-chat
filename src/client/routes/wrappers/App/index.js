import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

import AppContainer from './AppContainer'
import WorkspacePage from '../../workspace'
import WorkspaceApp from '../WorkspaceApp'

const App = () => (
  <Router>
    <AppContainer>
      <Switch>
        <Route exact path='/' component={WorkspacePage} />
        <Route path='/:workspaceName' component={WorkspaceApp} />
      </Switch>
      <ReduxToastr
        timeOut={3000}
        preventDuplicates
        position='bottom-right'
        transitionIn='fadeIn'
        transitionOut='fadeOut'
      />
    </AppContainer>
  </Router>
)

export default App
