const BlogForm = props => {
  const {
    onSubmit,
    titleValue,
    onTitleChange,
    authorValue,
    onAuthorChange,
    urlValue,
    onUrlChange,
  } = props
    return (
      <div>
        {' '}
        <h2>Create new</h2>
        <form onSubmit={onSubmit}>
          <div>
            Title:
            <input
              type='text'
              value={titleValue}
              name='title'
              onChange={onTitleChange}
            />
          </div>
          <div>
            Author:
            <input
              type='text'
              value={authorValue}
              name='author'
              onChange={onAuthorChange}
            />
          </div>
          <div>
            Url:
            <input
              type='text'
              value={urlValue}
              name='url'
              onChange={onUrlChange}
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
