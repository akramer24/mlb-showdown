import io from 'socket.io-client';
import store, { addOnlineUser, removeOnlineUser, sendChallenge, setUserSocket, setAwayTeam, setHomeTeam, setHomeLineup, setAwayLineup, setHomeRotation, setAwayRotation, updateGameState } from './store';
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

  socket.on('join game room', (welcome, challenger, user) => {
    history.push('/game/choose-lineup');
    store.dispatch(setAwayTeam(user.teamName));
    store.dispatch(setHomeTeam(challenger.teamName));
    console.log(welcome)
  })

  socket.on('lineup saved', (lineup, isHome) => {
    isHome ? store.dispatch(setHomeLineup(lineup)) : store.dispatch(setAwayLineup(lineup));
  })

  socket.on('rotation saved', (rotation, isHome) => {
    isHome ? store.dispatch(setHomeRotation(rotation)) : store.dispatch(setAwayRotation(rotation));
  })

  socket.on('update game state', newState => {
    // console.log('updated game state')
    store.dispatch(updateGameState(newState))
  })

  socket.on('send challenge', challenge => store.dispatch(sendChallenge(challenge)))
})


export default socket;
