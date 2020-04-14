import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'

const User = ({ user }) => {
  const link = '/users/' + user.id
  return (
    <tr>
      <td>
        <Link to={link}>{user.name}</Link>
      </td>
      <td style={{ textAlign: "right" }}>
        {user.blogs.length}
      </td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <User key={user.id} user={user} />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
