const createMessage = (name, message, user) => {
  return {
    name,
    message,
    user,
    date: new Date().getTime()
  };
}

module.exports = {
  createMessage
}