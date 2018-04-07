import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const styles = {
  button: {
    marginLeft: 20,
  },
  emailForm: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
}

class WorkspaceList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
    }
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.sendEmail(this.state.email)
  }

  render () {
    const { workspaces, sendEmail } = this.props
    return (
      <Fragment>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Link</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {workspaces.map((workspace, key) => (
              <TableRow key={key}>
                <TableRowColumn>{workspace.fullName}</TableRowColumn>
                <TableRowColumn>
                  <Link to={`/${workspace.displayName}`}>
                    http://localhost:3000/{workspace.displayName}
                  </Link>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider />
        <div style={styles.emailForm}>
          <form onSubmit={this.onSubmit}>
            <TextField
              type='email'
              // fullWidth
              hintText='Email'
              floatingLabelText='Email'
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <RaisedButton
              type='submit'
              disabled={false}
              fullWidth
              label='Send'
              primary
              style={styles.button}
            />
          </form>
        </div>
      </Fragment>
    )
  }
}

export default WorkspaceList
