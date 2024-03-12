import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle(''), setNewAuthor(''), setNewUrl('')
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type='text'
            value={newTitle}
            name='title'
            placeholder='Write blogs title here'
            onChange={event => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            value={newAuthor}
            name='author'
            placeholder='Write blogs author here'
            onChange={event => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type='text'
            value={newUrl}
            name='url'
            placeholder='Write blogs url here'
            onChange={event => setNewUrl(event.target.value)}
          />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm

// const BlogForm = ({
//   onSubmit,
//   titleValue,
//   onTitleChange,
//   authorValue,
//   onAuthorChange,
//   urlValue,
//   onUrlChange,
// }) => {
//   return (
//     <div>
//       <h2>Create new</h2>
//       <form onSubmit={onSubmit}>
//         <div>
//           Title:
//           <input
//             type='text'
//             value={titleValue}
//             name='title'
//             onChange={onTitleChange}
//           />
//         </div>
//         <div>
//           Author:
//           <input
//             type='text'
//             value={authorValue}
//             name='author'
//             onChange={onAuthorChange}
//           />
//         </div>
//         <div>
//           Url:
//           <input
//             type='text'
//             value={urlValue}
//             name='url'
//             onChange={onUrlChange}
//           />
//         </div>
//         <div>
//           <button type='submit'>create</button>
//         </div>
//       </form>
//     </div>
//   )
// }
