import socket from '../../../socket';

export function rollDice(homeTeam) {
  let count = 6;
  if (count > 0) {
    count--;
    let roll = Math.ceil(Math.random() * 20);
    socket.emit('update game state', { roll }, homeTeam);
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
  socket.emit('update game state', newState, homeTeam)
}
