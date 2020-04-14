import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog, commentOnBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const { reset: resetContent, ...content } = useField()

  const addComment = () => {
    try {
      dispatch(commentOnBlog(
        { comment: content.value },
        blog.id
      ))
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h4>comments</h4>
      <input name='comment' {...content} />
      <button onClick={addComment}>comment</button>
      <ul>
        {blog.comments.map((comment, i) => <li key={i}>{comment}</li>)}
      </ul>
    </div>
  )
}

const SingleBlog = ({ blog }) => {
  const dispatch = useDispatch()
  if (!blog) return null
  console.log(blog)
  const handleLike = () => {
    dispatch(updateBlog({
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url,
      title: blog.title,
    }, blog.id))
  }

  const handleRemove = () => {
    const result = window.confirm('remove ' + blog.title + '?')
    if (result) dispatch(deleteBlog(blog.id))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        {blog.url} <br />
        likes: {blog.likes} <button id='like-blog' onClick={handleLike}>like</button><br />
        {blog.user.name} <br />
        <button id='remove-blog' onClick={handleRemove}>remove</button>
      </div>

      <Comments blog={blog} />
    </div>
  )
}

export default SingleBlog
