import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    blogService.saveUser()
  }, [dispatch])

  return (
    <div>
      <h1>blogs</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog => {
              const link = '/blogs/' + blog.id
              return (
                <TableRow key={blog.id}>
                  <TableCell align='center'>
                    <Link to={link}>{blog.title}</Link>
                  </TableCell>
                  <TableCell align='center'>
                    {blog.author}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div >
  )
}

export default Blogs
