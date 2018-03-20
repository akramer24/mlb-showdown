import io from 'socket.io-client';
import store, { addOnlineUser, removeOnlineUser } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('add online user', onlineUsers => {
    store.dispatch(addOnlineUser(onlineUsers))
  })
  socket.on('online user removed', onlineUsers => {
    store.dispatch(removeOnlineUser(onlineUsers))
  })
})


export default socket;
