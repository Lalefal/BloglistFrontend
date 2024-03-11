import { useState } from 'react'

const Blog = ({ blog, onClick, username }) => {
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
                    <button onClick={onClick}>Like</button>
                  </td>
                </tr>
                <tr>
                  <td>User: {username}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    )
  }


export default Blog

