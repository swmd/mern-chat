import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import { withRouter, Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from '../../../common/renderComponents'

const validateWorkspaceForm = (values, props) => {
  let errors = {}
  if (!values.fullName) {
    errors.fullName = 'Full name is required'
  }
  if (!values.displayName) {
    errors.displayName = 'Display name is required'
  }
  if (!values.email) {
    errors.email = 'Admin user email is required'
  } else {
    let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    const isEmailValid = emailPattern.test(values.email)
    if (isEmailValid === false) {
      errors.email = 'Email is not valid'
    }
  }
  if (!values.password) {
    errors.password = 'Password is required'
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Password do not match'
  }
  return errors
}

const styles = {
  button: {
    marginTop: 20,
  },
  form: {
    width: '50%',
  },
}

let CreateWorkspace = ({ handleSubmit, pristine, submitting }) => (
  <form onSubmit={handleSubmit} style={styles.form}>
    <h2>Create Workspace</h2>

    <Field
      fullWidth
      hintText='Full Name'
      floatingLabelText='Full Name'
      name='fullName'
      component={renderTextField}
      required={true}
    />
    <br />
    <Field
      fullWidth
      hintText='Display Name'
      floatingLabelText='Display Name'
      name='displayName'
      component={renderTextField}
      required={true}
    />
    <br />
    <Field
      fullWidth
      type='email'
      hintText='Email'
      floatingLabelText='Admin User'
      name='email'
      component={renderTextField}
      required={true}
    />
    <br />
    <Field
      fullWidth
      type='password'
      hintText='Password'
      floatingLabelText='Password'
      name='password'
      component={renderTextField}
      required={true}
    />
    <br />
    <Field
      fullWidth
      type='password'
      hintText='Confirm Password'
      floatingLabelText='Confirm Password'
      name='passwordConfirm'
      component={renderTextField}
      required={true}
    />
    <br />
    <RaisedButton
      fullWidth
      type='submit'
      disabled={pristine || submitting}
      label='Create Workspace'
      primary
      style={styles.button}
    />
  </form>
)

CreateWorkspace = reduxForm({
  // a unique name for the form
  form: 'createWorkspace',
  validate: validateWorkspaceForm,
})(CreateWorkspace)

export default CreateWorkspace
