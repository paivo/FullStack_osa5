import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'tit',
    author: 'aut',
    url: 'url',
    likes: 0,
    view: false
  }
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent(
    'tit, aut'
  )
})

test('renders content when viewed', () => {
  const blog = {
    title: 'tit',
    author: 'aut',
    url: 'url',
    likes: 0,
    view: true
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)

  expect(component.container).toHaveTextContent(
    'tit, auturllikes: 0'
  )
})

test('double click', () => {
  const blog = {
    title: 'tit',
    author: 'aut',
    url: 'url',
    likes: 'likes',
    view: true
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)

  expect(component.container).toHaveTextContent(
    'tit, auturllikes: 0'
  )
})