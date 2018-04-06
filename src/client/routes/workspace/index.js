import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import { Tabs, Tab } from 'material-ui/Tabs'

import WorkspaceList from './components/WSList'
import CreateWorkspace from './components/CreateWorkspace'

import { createWorkspace, fetchWorkspaces } from '../../actions/workspaces'

const styles = {
  container: {
    padding: 50,
  },
  tab: {
    borderWidth: 0,
    borderRightWidth: 1,
    borderColor: '#efefef',
    borderStyle: 'solid',
  },
  tabContent: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderStyle: 'solid',
    borderTopWidth: 0,
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

class WorkspacePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'list',
    }
  }

  componentDidMount () {
    this.props.fetchWorkspaces()
  }

  handleChange = value => {
    this.setState({
      value: value,
    })
  }

  render () {
    return (
      <div style={styles.container}>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab label='Workspace List' value='list' style={styles.tab}>
            <div style={styles.tabContent}>
              <WorkspaceList workspaces={this.props.workspaces} />
            </div>
          </Tab>
          <Tab label='Create Workspace' value='create'>
            <div style={styles.tabContent}>
              <CreateWorkspace onSubmit={this.props.createWorkspace} />
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    workspaces: state.workspaces.workspaces,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchWorkspaces: () => dispatch(fetchWorkspaces()),
    createWorkspace: values => dispatch(createWorkspace(values)),
  }
}

const connectedWorkspacePage = connect(mapStateToProps, mapDispatchToProps)(
  WorkspacePage
)

export default connectedWorkspacePage
