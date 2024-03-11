import PropTypes from 'prop-types'

const LogoutForm = ({ handleLogout, userName }) => {
  return (
    <form onSubmit={handleLogout}>
      <div>
        <p>
          {userName} is logged in
          <button type='submit'>logout</button>
        </p>
      </div>
    </form>
  )
}

LogoutForm.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
}

export default LogoutForm
