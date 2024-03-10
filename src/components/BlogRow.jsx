import { useState } from 'react'

const BlogRow = ({ blog, onClick }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <>
      <tr>
        <td>
          {blog.title}&nbsp;
          <button onClick={toggleVisibility}>
            {visible ? 'hide' : 'view'}
          </button>
        </td>
      </tr>
      {visible && (
        <>
          <tr>
            <td>{blog.author}</td>
          </tr>
          <tr>
            <td> {blog.url}</td>
          </tr>
          <tr>
            <td>
              <span>Likes </span>
              {blog.likes}&nbsp;
              <button onClick={onClick}>Like</button>
            </td>
          </tr>
        </>
      )}
    </>
  )
}

export default BlogRow
