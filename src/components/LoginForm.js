import React from 'react'

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin
}) => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <p>
          username:
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </p>
        <p>
          password:
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </p>
        <button id='login-btn' type="submit" onClick={handleLogin}>login</button>
      </form>
    </div>
  )
}

export default LoginForm
