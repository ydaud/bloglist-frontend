import React from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../reducers/loginReducer'
import { AppBar, Toolbar, Button } from '@material-ui/core'

const Menu = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const currUser = useSelector(state => state.currUser)
  const match = useRouteMatch('/login')

  if (!currUser) {
    if (!match) history.push('/login')
    return null
  }

  const handleLogout = () => {
    dispatch(signOut())
    history.push('/login')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/create">
          create
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <em style={{ marginLeft: "auto" }}>{currUser.username} logged in
          <Button color="inherit" onClick={handleLogout}>
            logout
          </Button>
        </em>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
