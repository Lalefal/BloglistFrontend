
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          Password
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm

//   const loginForm = () => (
//     <form onSubmit={handleLogin}>
//       <div>
//         username
//         <input
//           type='text'
//           value={username}
//           name='Username'
//           onChange={({ target }) => setUsername(target.value)}
//         />
//       </div>
//       <div>
//         password
//         <input
//           type='password'
//           value={password}
//           name='Password'
//           onChange={({ target }) => setPassword(target.value)}
//         />
//       </div>
//       <button type='submit'>login</button>
//     </form>
//   )
