import React from 'react'

const Blog = ({ blog, handleViewChange }) => {
  console.log(handleViewChange)
  if (blog.view) {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={() => handleViewChange}>hide</button>
        {blog.url}
          likes{blog.likes}
        <button>like</button>
        {blog.user.name}
      </div>
    )
  }
  return (
    <div>
      {blog.title} {blog.author} <button onClick={() => handleViewChange}>view</button>
    </div>
  )
}

export default Blog