import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogRow from './components/BlogRow'
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
          <Blog key={blog.id} blog={blog} />
        ))}
        {/* <table>
          <tbody>
            {blogs.map(blog => (
              <BlogRow key={blog.id} blog={blog} onClick={addBlog}/>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  )
}

export default App

// const blogForm = () => {
//   const hideWhenVisible = { display: createVisible ? 'none' : '' }
//   const showWhenVisible = { display: createVisible ? '' : 'none' }

//   return (
//     <div>
//       <div style={hideWhenVisible}>
//         <button onClick={() => setCreateVisible(true)}>Add new blog </button>
//       </div>
//       <div style={showWhenVisible}>
//         <BlogForm
//           onSubmit={addBlog}
//           titleValue={newTitle}
//           onTitleChange={handleTitleChange}
//           authorValue={newAuthor}
//           onAuthorChange={handleAuthorChange}
//           urlValue={newUrl}
//           onUrlChange={handleUrlChange}
//         />
//         <button onClick={() => setCreateVisible(false)}>cancel</button>
//       </div>
//     </div>
//   )
// }
//const addBlog = async event => {
// event.preventDefault()
// const blogObject = {
//   title: newTitle,
//   author: newAuthor,
//   url: newUrl,
// }
//   try {
//     const returnedBlog = await blogService.create(blogObject)
//     setBlogs(blogs.concat(returnedBlog))
//     // setNewTitle(''), setNewAuthor(''), setNewUrl(''), setCreateVisible(false)
//     handleNotification(`A new blog ${newTitle} by ${newAuthor} added`, {
//       text: 'green',
//       border: 'green',
//     })
//   } catch (error) {
//     handleNotification(error.response.data.error, {
//       text: 'red',
//       border: 'red',
//     })
//   }
// }

// const handleTitleChange = event => {
//   setNewTitle(event.target.value)
// }

// const handleAuthorChange = event => {
//   setNewAuthor(event.target.value)
// }

// const handleUrlChange = event => {
//   setNewUrl(event.target.value)
// }
