let onlineUsers = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('add online user', user => {
      socket.userId = user.id;
      socket.teamName = user.teamName;
      if (!onlineUsers.includes(user.teamName) && user.teamName !== undefined) {
        onlineUsers.push(user.teamName);
      }
      console.log(onlineUsers)
      io.emit('add online user', onlineUsers);
    })
    socket.on('remove online user', teamName => {
      onlineUsers = onlineUsers.filter(team => team !== teamName);
      io.emit('online user removed', onlineUsers)
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
