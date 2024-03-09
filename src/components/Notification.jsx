const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    color: color.text,
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: color.borderColor,
    padding: 10,
    margin: 15,
    fontSize: 20,
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
