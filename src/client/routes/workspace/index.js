import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './style.css'

class WorkspacePage extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='container'>
        <Tabs>
          <TabList>
            <Tab>Workspace List</Tab>
            <Tab>Create Workspace</Tab>
          </TabList>

          <TabPanel>
            <h1>Workspace list</h1>
          </TabPanel>
          <TabPanel>
            <h1>Workspace create</h1>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

const connectedWorkspacePage = connect(mapStateToProps)(WorkspacePage)

export default connectedWorkspacePage
