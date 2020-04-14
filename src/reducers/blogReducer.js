import blogService from '../services/blogs'

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DEL_BLOG',
      data: id,
    })
  }
}

export const updateBlog = (content, id) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(content, id)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    })
  }
}

export const commentOnBlog = (content, id) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(content, id)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'DEL_BLOG':
      return state.filter(blog => blog.id !== action.data)
    case 'UPDATE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
        .concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export default reducer
