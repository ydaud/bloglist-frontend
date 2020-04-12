import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('passes new blog to handler', () => {
  const mockHandler = jest.fn()

  const component = render(
    <NewBlogForm createBlog={mockHandler} />
  )

  const createButton = component.getByText('create')
  fireEvent.click(createButton)

  const blog = mockHandler.mock.calls[0][0]
  expect(blog.title).toBeDefined()
  expect(blog.author).toBeDefined()
  expect(blog.url).toBeDefined()
})
