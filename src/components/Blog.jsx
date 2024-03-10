import { useState } from 'react'

const Blog = ({ blog, onClick }) => {
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
                  <td>{blog.author}</td>
                </tr>
                <tr>
                  <td>{blog.url}</td>
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
          </tbody>
        </table>
      </div>
    )
  }


export default Blog
// <>
//   <tr>
//     <td>{blog.title}</td>
//   </tr>
//   <tr>
//     <td>{blog.author}</td>
//   </tr>
//   <tr>
//     <td>{blog.url}</td>
//   </tr>
//   <tr>
//     <td>
//       <span>Likes: </span>
//       {blog.likes}&nbsp;
//       <button onClick={onClick}>Like</button>
//     </td>
//   </tr>
// </>

// {
//   /* {blog.title} {blog.author} {blog.likes} */
// }
// <div>
// <tr>
//   <td>{blog.title}</td>
// </tr>
// <tr>

//   <td>{blog.author}</td>

// </tr>
// <tr>

//   <td> {blog.url}</td>

// </tr>
// <tr>
//   <td> {blog.likes}</td>
// </tr>
// </div>
  
          //   {/* <tr>
          //   <td>{blog.author}</td>
          // </tr>
          // <tr>
          //   <td> {blog.url}</td>
          // </tr>
          // <tr>
          //   <td>
          //     <span>Likes </span>
          //     {blog.likes}&nbsp;
          //     <button onClick={onClick}>Like</button>
          //   </td>
          // </tr> */}
