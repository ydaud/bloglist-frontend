import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    likeBlog({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url,
      title: blog.title,
    }, blog.id)
  }

  const handleRemove = () => {
    const result = window.confirm('remove ' + blog.title + '?')

    if (result) deleteBlog(blog.id)
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'show'
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button id='show-blog' onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes: {blog.likes} <button id='like-blog' onClick={handleLike}>like</button><br />
        {blog.user.name} <br />
        <button id='remove-blog' onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog
