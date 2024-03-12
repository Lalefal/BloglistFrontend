import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('When creating a new blog', () => {
  test('BlogForm updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog} />)

    screen.debug()

    const input1 = screen.getByPlaceholderText('Write blogs title here')
    const input2 = screen.getByPlaceholderText('Write blogs author here')
    const input3 = screen.getByPlaceholderText('Write blogs url here')
    const button = screen.getByText('create')

    await user.type(input1, 'Testataan blogin lisäystä')
    await user.type(input2, 'Sirpa')
    await user.type(input3, 'jonnekin.fi')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls)
  })
})
