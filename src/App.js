import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [msg, setMsg] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserJSON')
    if (loggedUserJSON) {
      blogService.saveUser(JSON.parse(loggedUserJSON))
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes - b.likes))
    )
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const tmpUser = await loginService.login({
        username, password,
      })

      blogService.saveUser(tmpUser)
      setUser(tmpUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMsg({
        type: 'error',
        content: 'invalid username or password',
      })
      setTimeout(() => setMsg(null), 5000)
    }
  }

  const handleLogout = () => {
    blogService.removeUser()
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(newBlog)
      setBlogs(blogs
        .concat(response)
        .sort((a, b) => a.likes - b.likes))

      setMsg({
        type: 'success',
        content: 'created blog',
      })
      setTimeout(() => setMsg(null), 5000)
    } catch (exception) {
      setMsg({
        type: 'error',
        content: 'unable to create blog',
      })
      setTimeout(() => setMsg(null), 5000)
    }
  }

  const likeBlog = async (updatedBlog, id) => {
    try {
      const response = await blogService.update(updatedBlog, id)

      setBlogs(blogs
        .filter((blog) => blog.id !== response.id)
        .concat(response)
        .sort((a, b) => a.likes - b.likes))

      setMsg({
        type: 'success',
        content: 'updated blog',
      })
      setTimeout(() => setMsg(null), 5000)
    } catch (exception) {
      setMsg({
        type: 'error',
        content: 'error updating blog',
      })
      setTimeout(() => setMsg(null), 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)

      setBlogs(blogs
        .filter((blog) => blog.id !== id)
        .sort((a, b) => a.likes - b.likes))

      setMsg({
        type: 'success',
        content: 'updated blog',
      })
      setTimeout(() => setMsg(null), 5000)
    } catch (exception) {
      setMsg({
        type: 'error',
        content: 'unable to delete blog',
      })
      setTimeout(() => setMsg(null), 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={msg} />
        <LoginForm
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification message={msg} />
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout} >logout</button>
      </p>

      <Togglable buttonLabel="create" ref={blogFormRef}>
        <NewBlogForm createBlog={createBlog} />
      </Togglable>

      <div id='blog-list'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
        )}
      </div>

    </div>
  )
}

export default App
