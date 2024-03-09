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
          <input
            value={username}
            onChange={handleUsernameChange}
            //type='text'
            //name='Username'
            //onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            //name='Password'
            //onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
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