import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const saveUser = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedUserJSON'))
  token = user ? 'bearer ' + user.token : null
}

const removeUser = () => {
  token = null
  window.localStorage.removeItem('loggedUserJSON')
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updatedBlog, id) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log(updatedBlog)

  const response = await axios.put(baseUrl + '/' + id, updatedBlog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl + '/' + id, config)
  return response.data
}

const comment = async (content, id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl + '/' + id + '/comments', content, config)
  return response.data
}

export default {
  getAll,
  saveUser,
  removeUser,
  create,
  update,
  remove,
  comment,
}
