import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author by default', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 10,
    user: {
      username: 'username',
      name: 'name'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'title author'
  )
})

test('renders url and likes after button click', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 10,
    user: {
      username: 'username',
      name: 'name'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)


  expect(component.container).toHaveTextContent(
    'url'
  )
  expect(component.container).toHaveTextContent(
    '10'
  )
})

test('calls like function', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 10,
    user: {
      username: 'username',
      name: 'name'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} likeBlog={mockHandler} />
  )

  const showButton = component.getByText('show')
  fireEvent.click(showButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
