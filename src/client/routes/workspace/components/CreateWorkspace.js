import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import { withRouter, Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

const styles = {
  button: {
    marginTop: 20,
  },
  form: {
    width: '50%',
  },
}

const CreateWorkspace = ({ handleSubmit, pristine, submitting }) => (
  <form onSubmit={handleSubmit} style={styles.form}>
    <h2>Create Workspace</h2>

    <TextField
      fullWidth
      hintText='Full Name'
      floatingLabelText='Full Name'
      onChange={e => this.onFieldChange('username', e)}
    />
    <br />
    <TextField
      fullWidth
      hintText='Display Name'
      floatingLabelText='Display Name'
    />
    <br />
    <TextField
      autoFocus
      fullWidth
      type='email'
      hintText='Email'
      floatingLabelText='Admin User'
    />
    <br />
    <TextField
      fullWidth
      type='password'
      hintText='Password'
      floatingLabelText='Password'
    />
    <br />
    <TextField
      fullWidth
      type='password'
      hintText='Confirm Password'
      floatingLabelText='Confirm Password'
    />
    <br />
    <RaisedButton
      fullWidth
      type='submit'
      disabled={false}
      label='Create Workspace'
      primary
      style={styles.button}
    />
  </form>
)

export default CreateWorkspace
