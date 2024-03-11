import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, onClick, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  }
  const buttonStyle = {
    borderRadius: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showRemoveButton = currentUser && blog.user.name === currentUser

  return (
    <div style={blogStyle}>
      <table>
        <tbody>
          <tr>
            <td>
              {blog.title}&nbsp;
              <button style={buttonStyle} onClick={toggleVisibility}>
                {visible ? 'hide' : 'view'}
              </button>
            </td>
          </tr>
          {visible && (
            <>
              <tr>
                <td>Author: {blog.author}</td>
              </tr>
              <tr>
                <td>Url: {blog.url}</td>
              </tr>
              <tr>
                <td>
                  <span>Likes: </span>
                  {blog.likes}&nbsp;
                  <button onClick={onLike}>Like</button>
                </td>
              </tr>
              <tr>
                <td>User: {blog.user.name}</td>
              </tr>
              {showRemoveButton && (
                <>
                  <tr>
                    <td>
                      <button onClick={onClick}>Remove</button>
                    </td>
                  </tr>
                </>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  )
}

Blog.propTypes = {
  onLike: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
}

export default Blog

