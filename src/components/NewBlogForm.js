import React, { useState } from 'react'
import { useDispatch, useHitory } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { useHistory } from 'react-router-dom'

const NewBlogForm = () => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const dispatch = useDispatch()
  const history = useHistory()

  const addBlog = (event) => {
    event.preventDefault()

    try {
      dispatch(createBlog({
        title: title.value,
        author: author.value,
        url: url.value
      }))

      resetTitle()
      resetAuthor()
      resetUrl()

      dispatch(setNotification('you created "' + title.value + '"', 'success', 5))
      history.push('/')
    } catch (exception) {
      dispatch(setNotification('error creating new blog', 'error', 5))
    }
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form>
        <p>
          title:
          <input
            id='add-title'
            name="Title"
            {...title}
          />
          <br />
          author:
          <input
            id='add-author'
            name="Author"
            {...author}
          />
          <br />
          url:
          <input
            id='add-url'
            name="Url"
            {...url}
          />
        </p>
        <button id='create-blog' type="submit" onClick={addBlog}>create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
