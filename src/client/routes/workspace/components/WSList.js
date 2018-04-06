import React from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const WorkspaceList = ({ workspaces }) => {
  return (
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
  )
}

export default WorkspaceList
