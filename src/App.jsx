import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState(null)
  //const [newBlog, setNewBlog] = useState('')
  //const [errorMessage, setErrorMessage] = useState(null)

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
    const loggedUserJSON = window.localStorage.getItem('loggedBloggappUser')
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
      window.localStorage.setItem('loggedBloggappUser', JSON.stringify(user))
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
    window.localStorage.removeItem('loggedBloggappUser')
    setUser(null)
  }

  const addBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle(''), setNewAuthor(''), setNewUrl('')
      handleNotification(`A new blog ${newTitle} by ${newAuthor} added`, {
        text: 'green',
        border: 'green',
      })
    } catch (error) {
      handleNotification(error.response.data.error, {
        text: 'red',
        border: 'red',
      })
    }
  }

  const handleTitleChange = event => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setNewUrl(event.target.value)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input
          type='text'
          value={newTitle}
          name='title'
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author:
        <input
          type='text'
          value={newAuthor}
          name='author'
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        Url:
        <input
          type='text'
          value={newUrl}
          name='url'
          onChange={handleUrlChange}
        />
      </div>
      <div>
        <button type='submit'>create</button>
      </div>
    </form>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const logOutForm = () => (
    <form onSubmit={handleLogout}>
      <div>
        <p>
          {user.name} is logged in
          <button type='submit'>logout</button>
        </p>
      </div>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={msg && msg.message} color={msg && msg.color} />
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={msg && msg.message} color={msg && msg.color} />
      {logOutForm()}
      <div>{blogForm()}</div>
      <div>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default App
