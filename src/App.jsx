import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [msg, setMsg] = useState(null)

  const handleNotification = (message, color) => {
    setMsg({ message, color })
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      handleNotification(error.response.data.error, {
        text: 'red',
        border: 'red',
      })
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const blogFormRef = useRef() //viite komponenttiin

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      handleNotification(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        {
          text: 'green',
          border: 'green',
        }
      )
    } catch (error) {
      handleNotification(error.response.data.error, {
        text: 'red',
        border: 'red',
      })
    }
  }
const addLike = async id => {
  try {
    const blogToUpdate = blogs.find(n => n.id === id)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    const returnedBlog = await blogService.update(id, updatedBlog)
    setBlogs(blogs.map(blog => (blog.id !== id ? blog : returnedBlog)))
  } catch (error) {
      handleNotification(error.response.data.error, {
        text: 'red',
        border: 'red',
      })
    } 
}


  if (user === null) {
    return (
      <div>
        <Notification message={msg && msg.message} color={msg && msg.color} />
        <Togglable buttonLabel='Log in'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }
  return (
    <div>
      <h2>Welcome to BlogsList</h2>
      <Notification message={msg && msg.message} color={msg && msg.color} />
      <LogoutForm handleLogout={handleLogout} userName={user.name} />

      <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div>
        <h3>List of Blogs</h3>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} onClick={() => addLike(blog.id)} username={user.name} />
        ))}

      </div>
    </div>
  )
}

export default App
