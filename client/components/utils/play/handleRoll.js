import socket from '../../../socket';
import store, { updateGameState } from '../../../store';

export function rollDice() {
  let count = 6;
  if (count > 0) {
    count--;
    let roll = Math.ceil(Math.random() * 20);
    store.dispatch(updateGameState({ roll }));
    socket.emit('update game state', { roll });
  }
}

export function setTurn(roll, control, onBase, totalPAs, homeTeam) {
  let newState = (roll + control > onBase) ? {
    turn: 'pitcher',
    roll,
    result: '',
    totalPAs: totalPAs + 1
  }
    :
    {
      turn: 'batter',
      roll,
      result: '',
      totalPAs: totalPAs + 1
    }
  store.dispatch(updateGameState(newState));
  socket.emit('update game state', newState, homeTeam)
}
