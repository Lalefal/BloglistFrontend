const LogoutForm = ({ handleLogout, userName }) =>
{ return(
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

export default LogoutForm


  // const logOutForm = () => (
  //   <form onSubmit={handleLogout}>
  //     <div>
  //       <p>
  //         {user.name} is logged in
  //         <button type='submit'>logout</button>
  //       </p>
  //     </div>
  //   </form>
  // )
