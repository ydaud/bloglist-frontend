import React from 'react'
import { signIn } from '../reducers/loginReducer'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector(state => state.currUser)

  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  if (currUser) {
    history.push('/')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const tmpUser = await loginService.login({
        username: username.value,
        password: password.value,
      })
      resetUsername()
      resetPassword()

      dispatch(signIn(tmpUser))
      dispatch(setNotification('successful login', 'success', 5))
      history.push('/')
    } catch (e) {
      dispatch(setNotification('error logging in', 'error', 5))
    }
  }
  return (
    <div>
      <h4>login</h4>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="username" {...username} />
        </div>
        <div>
          <TextField label="password" {...password} />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
