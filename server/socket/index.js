let onlineUsers = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('add online user', user => {
      socket.teamName = user.teamName
      const userObj = { teamName: user.teamName, socketId: socket.id }

      let isAlreadyOnline = false;
      for (let i = 0; i < onlineUsers.length; i++) {
        let onlineUser = onlineUsers[i];
        if (onlineUser.teamName === userObj.teamName) {
          isAlreadyOnline = true;
          break;
        }
      }
      if (!isAlreadyOnline && userObj.teamName) onlineUsers.push(userObj);
      console.log(onlineUsers)
      io.emit('add online user', onlineUsers);
    })
    
    socket.on('remove online user', teamName => {
      onlineUsers = onlineUsers.filter(team => team !== teamName);
      io.emit('online user removed', onlineUsers)
    })

    socket.on('send challenge', userObj => {
      const recipient = io.sockets.connected[userObj.socketId];
      const challenge = { teamName: socket.teamName, socketId: socket.id, date: new Date() }
      recipient.challengesReceived
        ? recipient.challengesReceived.push(challenge)
        : recipient.challengesReceived = [challenge];
      socket.broadcast.to(recipient.id).emit('send challenge', challenge);
    })

    socket.on('play ball', (challenger, user) => {
      const userSocket = io.sockets.connected[user.socketId];
      const challengerSocket = io.sockets.connected[challenger.socketId]
      userSocket.join(challenger.teamName)
      challengerSocket.join(challenger.teamName)
      const welcome = `a new user has joined the room ${challenger.teamName}`;
      io.to(challenger.teamName).emit('join game room', welcome, challenger, user)
    })

    socket.on('lineup saved', (lineup, isHome, awayTeam, homeTeam) => {
      io.to(homeTeam).emit('lineup saved', lineup, isHome)
    })

    socket.on('rotation saved', (rotation, isHome, awayTeam, homeTeam) => {
      io.to(homeTeam).emit('rotation saved', rotation, isHome)
    })

    socket.on('update game state', (newState, homeTeam) => {
      io.to(homeTeam).emit('update game state', newState);
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      onlineUsers = onlineUsers.filter(userObj => userObj.socketId !== socket.id)
      io.emit('online user removed', onlineUsers);
    })
  })
}
