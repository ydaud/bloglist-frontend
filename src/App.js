import React, { useState, useEffect } from 'react'
import { Switch, Route, useRouteMatch, Link } from "react-router-dom"
import Blogs from './components/Blogs'
import Users from './components/Users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import Menu from './components/Menu'
import { initializeBlogs } from './reducers/blogReducer'
import { getStoredUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getStoredUser())
    dispatch(initializeUsers())
  }, [dispatch])


  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null


  return (
    <div>
      <Notification />
      <Menu />
      <Switch>
        <Route path='/create'>
          <NewBlogForm />
        </Route>

        <Route path='/users/:id'>
          <SingleUser user={user} />
        </Route>

        <Route path='/users'>
          <Users />
        </Route>

        <Route path='/blogs/:id'>
          <SingleBlog blog={blog} />
        </Route>

        <Route path='/login'>
          <LoginForm />
        </Route>

        <Route path='/'>
          <Blogs id='blog-list' />
        </Route>


      </Switch>

    </div>
  )
}

export default App
