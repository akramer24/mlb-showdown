import io from 'socket.io-client';
import store, { addOnlineUser, removeOnlineUser, sendChallenge, setUserSocket } from './store';
import history from './history';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('add online user', onlineUsers => {
    const userTeam = store.getState().user.activeUser.userInfo.teamName;
    store.dispatch(addOnlineUser(onlineUsers.filter(userObj => {
      if (userObj.teamName !== userTeam) {
        
        return userObj;
      } else {
        store.dispatch(setUserSocket(userObj.socketId))
      }
    }))
  )});
  socket.on('online user removed', onlineUsers => {
    store.dispatch(removeOnlineUser(onlineUsers))
  })

  socket.on('join game room', welcome => {
    history.push('/game/choose-lineup');
    console.log(welcome)
  })
  socket.on('send challenge', challenge => store.dispatch(sendChallenge(challenge)))
})


export default socket;
