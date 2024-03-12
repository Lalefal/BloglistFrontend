import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('The very first front-end test', () => {
  test('renders title', () => {
    const blog = {
      title: 'Blogin lisääminen',
      author: 'mluukkai',
      url: 'https://fullstackopen.com/osa4/kayttajien_hallinta',
      likes: 0,
    }
    render(<Blog blog={blog} />)

    const elem = screen.getByText('Blogin lisääminen')
    expect(elem).toBeDefined()

    const elem2 = screen.queryByText('mluukkai')
    expect(elem2).toBeNull()
  })
})

describe('Buttons are found and pressed', () => {
  test('View-button works', async () => {
    const blog = {
      title: 'eka lisäys',
      author: 'Laura',
      url: 'kokeilu.com',
      likes: 15,
      user: {
        username: 'lafal',
        name: 'Laura',
        id: '65e8772030d701f37f8f3e4d',
      },
      id: '65ebf9954433a6cda63cb857',
    }

    const viewBlog = vi.fn()
    render(<Blog blog={blog} toggleVisibility={viewBlog} />)

    //screen.debug()

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const elem = screen.getByText('Likes:')
    expect(elem).toBeDefined()

    const elem2 = screen.getByText('15')
    expect(elem2).toBeDefined()

    const elem3 = screen.getByText('Url: kokeilu.com')
    expect(elem3).toBeDefined()

    const elem4 = screen.getByText('User: Laura')
    expect(elem4).toBeDefined()
  })

  test('Like-button is called twice', async () => {
    const blog = {
      title: 'eka lisäys',
      author: 'Laura',
      url: 'kokeilu.com',
      likes: 15,
      user: {
        username: 'lafal',
        name: 'Laura',
        id: '65e8772030d701f37f8f3e4d',
      },
      id: '65ebf9954433a6cda63cb857',
    }

    const likeBlog = vi.fn()
    render(<Blog blog={blog} toggleVisibility={likeBlog} onLike={likeBlog} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    const elem = screen.getByText('Likes:')
    expect(elem).toBeDefined()
    await user.click(likeButton)
    await user.click(likeButton)

    //screen.debug()

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})

