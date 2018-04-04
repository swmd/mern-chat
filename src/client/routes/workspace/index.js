import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import { Tabs, Tab } from 'material-ui/Tabs'
import WorkspaceList from './components/WSList'

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
  },
}

class WorkspacePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'list',
    }
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
              <WorkspaceList workspaces={[]} />
            </div>
          </Tab>
          <Tab label='Create Workspace' value='create'>
            <div style={styles.tabContent}>
              <p>
                This is another example of a controllable tab. Remember, if you
                use controllable Tabs, you need to give all of your tabs values
                or else you wont be able to select them.
              </p>
            </div>
          </Tab>
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
