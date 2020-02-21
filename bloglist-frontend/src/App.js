import loginService from './services/login' 
import Notification from './components/Notification'
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newView, setNewView] = useState(false)

  const blogFormRef = React.createRef()


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleViewChange = (event) => {
    setNewView(!newView)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
  
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setErrorMessage(
      `a new blog ${blogObject.title} by ${blogObject.author}`
    )
    setErrorType('success')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setErrorType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      
      <Notification message={errorMessage} type={errorType} />
      

      {user === null ?
        <div>
          <h2>Login</h2>
          {loginForm()}
        </div>
        :
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={logOut}>logout</button>
          </p> 
          {blogForm()}
          <br></br>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleViewChange={handleViewChange}  />
          )}
        </div>
      }

    </div>
  )
}

export default App