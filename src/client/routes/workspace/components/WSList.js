import React from 'react'

const WorkspaceList = ({ workspaces }) => {
  return (
    <ul>
      {workspaces.map(workspace => (
        <li>
          <span>{workspace.title}</span>
          <span>{workspace.url}</span>
        </li>
      ))}
    </ul>
  )
}

export default WorkspaceList
