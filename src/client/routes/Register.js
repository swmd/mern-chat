import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Link, withRouter } from 'react-router-dom'

class Register extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    errors: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
    },
  }

  onSubmit = e => {
    e.preventDefault()

    fetch('/api/register', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(() => {
        this.props.history.push({
          pathname: '/chat',
          state: {
            email: this.state.email,
            username: this.state.username,
          },
        })
      })
      .catch(() => {
        this.setState({ registerError: true })
      })
  }

  onEmailBlur = () => {
    // form validation
    let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    const isEmailValid = emailPattern.test(this.state.email)
    let emailError = ''
    if (isEmailValid === false) {
      emailError = 'Email is not valid'
    } else {
      fetch(`/api/email/${this.state.email}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          if (response.alreadyInUse) {
            emailError = 'Email is already in use. Please choose another'
            this.setState({
              errors: {
                ...this.state.errors,
                email: emailError,
              },
            })
          }
        })
        .catch(() => {})
    }
    this.setState({
      errors: {
        ...this.state.errors,
        email: emailError,
      },
    })
  }

  onFieldChange = (fieldName, event) => {
    let value = event.target.value
    let errors = { ...this.state.errors }
    if (value == '') {
      errors[fieldName] = `${fieldName} can 't be blank`
    } else {
      errors[fieldName] = ''
    }
    this.setState({
      [fieldName]: value,
      errors,
    })
  }

  onPasswordConfirmChange = e => {
    const confirmPassword = e.target.value
    let confirmError = ''
    if (this.state.password !== confirmPassword) {
      confirmError = 'Password does not match'
    }
    this.setState({
      passwordConfirm: confirmPassword,
      errors: {
        ...this.state.errors,
        passwordConfirm: confirmError,
      },
    })
  }

  render () {
    return (
      <div className='ChooseNickDialogContainer'>
        <p>Create an account</p>

        <div className='ChooseNickDialog'>
          <form onSubmit={this.onSubmit}>
            <TextField
              fullWidth
              autoFocus
              type='email'
              hintText='Email'
              value={this.state.email}
              onChange={e => this.onFieldChange('email', e)}
              onBlur={this.onEmailBlur}
              errorText={
                this.state.errors.email !== '' && this.state.errors.email
              }
            />
            <TextField
              fullWidth
              hintText='Username'
              value={this.state.username}
              onChange={e => this.onFieldChange('username', e)}
              errorText={
                this.state.errors.username !== '' && this.state.errors.username
              }
            />
            <TextField
              type='password'
              fullWidth
              hintText='Password'
              value={this.state.password}
              onChange={e => this.onFieldChange('password', e)}
              errorText={
                this.state.errors.password !== '' && this.state.errors.password
              }
            />
            <TextField
              type='password'
              fullWidth
              hintText='Confirm Password'
              value={this.state.passwordConfirm}
              onChange={e => this.onPasswordConfirmChange(e)}
              errorText={
                this.state.errors.passwordConfirm !== '' &&
                this.state.errors.passwordConfirm
              }
            />
            <RaisedButton
              type='submit'
              disabled={false}
              fullWidth
              label='Create an account'
              primary
            />
          </form>
          <p>
            or <Link to='/'>login with an existing account</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(Register)
