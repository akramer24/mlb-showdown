import io from 'socket.io-client';
import store, { addOnlineUser, removeOnlineUser } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('add online user', onlineUsers => {
    const userTeam = store.getState().user.activeUser.userInfo.teamName;
    store.dispatch(addOnlineUser(onlineUsers.filter(team => team !== userTeam)))
  })
  socket.on('online user removed', onlineUsers => {
    store.dispatch(removeOnlineUser(onlineUsers))
  })
})


export default socket;
