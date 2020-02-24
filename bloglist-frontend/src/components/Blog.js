import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [newView, setNewView] = useState(false)

  const handleViewChange = () => {
    setNewView(!newView)
  }

  const handleLikeChange = (event) => {
    event.preventDefault()
    likeBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      view: true,
      id: blog.id
    })
  }

  const handleRemove = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (!newView) {
    return (
      <li className='blog'>
        <div style={blogStyle}>
          <div>
            {blog.title}, {blog.author} <button onClick={handleViewChange}>view</button>
          </div>
        </div>
      </li>
    )
  }

  return (
    <li className='blog'>
      <div style={blogStyle}>
        <div>
          {blog.title}, {blog.author} <button onClick={handleViewChange}>hide</button><br></br>
          {blog.url}<br></br>
            likes: {blog.likes}
          <button id='like-button' onClick={handleLikeChange}>like</button><br></br>
          {(typeof blog.user === 'undefined') ? 'No declared user' : blog.user.name}<br></br>
          {!(typeof blog.user === 'undefined') ? <button id='remove-button' onClick={handleRemove}> remove </button> :''}
        </div>
      </div>
    </li>
  )

  
}

export default Blog