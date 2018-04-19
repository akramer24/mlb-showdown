import io from 'socket.io-client';
import store, { addOnlineUser, removeOnlineUser, receiveChallenge, setUserSocket, setAwayTeam, setHomeTeam, setHomeLineup, setAwayLineup, setHomeRotation, setAwayRotation, updateGameState, updateChallenge, removeChallenge, resetGameState } from './store';
import history from './history';
import webrtc from './SimpleWebRTC';

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
    )
  });

  socket.on('online user removed', onlineUsers => {
    store.dispatch(removeOnlineUser(onlineUsers))
  })

  socket.on('join game room', (welcome, challenger, user) => {
    history.push('/game/choose-lineup');
    store.dispatch(setAwayTeam(user.teamName));
    store.dispatch(setHomeTeam(challenger.teamName));
    store.dispatch(updateGameState({ userSocketId: user.socketId, challengerSocketId: challenger.socketId }))
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

  socket.on('send challenge', challenge => {
    const int = setInterval(() => {
      if (challenge.timeRemaining === 0) {
        clearInterval(int);
        store.dispatch(removeChallenge(challenge))
        socket.emit('challenge rejected', challenge)
      }
      challenge.timeRemaining--;
      store.dispatch(updateChallenge(challenge));
    }, 1000)
    store.dispatch(receiveChallenge(challenge))
  })

  socket.on('challenge rejected', rejectedChallenge => {
    store.dispatch(removeChallenge(rejectedChallenge))
  })

  socket.on('video chat requested', homeTeam => webrtc.emit('create video room', homeTeam));
  socket.on('created video room', () => store.dispatch(updateGameState({ videoRoomCreated: true })));
  socket.on('join video room', homeTeam => webrtc.emit('join video room', homeTeam));

})


export default socket;
