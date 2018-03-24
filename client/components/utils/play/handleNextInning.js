import socket from '../../../socket';
import store, { updateGameState } from '../../../store';

export function handleNextInning() {
  const newInning = this.props.gameState.inning + 1;
  let newState = {};
  if (this.state.half == 'top') {
    newState = {
      awayOrder: this.props.gameState.currentOrder,
      result: '',
      totalPAs: 0,
      half: 'bottom',
      outs: 0,
      first: '',
      second: '',
      third: '',
      currentOrder: this.props.gameState.homeOrder,
      batter: this.props.gameState.homeOrder[0],
      pitcher: this.props.gameState.awayPitcher,
      awayScore: this.props.gameState.currentScore,
      currentScore: this.props.gameState.homeScore,
      awayHits: this.props.gameState.currentHits,
      currentHits: this.props.gameState.homeHits,
      bench: this.props.gameState.homeBench,
      bullpen: this.props.gameState.homeBullpen,
      inningRuns: 0
    }
  } else if (this.state.half == 'bottom') {
    newState = {
      homeOrder: this.props.gameState.currentOrder,
      half: 'top',
      result: '',
      totalPAs: 0,
      outs: 0,
      inning: newInning,
      first: '',
      second: '',
      third: '',
      currentOrder: this.props.gameState.awayOrder,
      batter: this.props.gameState.awayOrder[0],
      pitcher: this.props.gameState.homePitcher,
      homeScore: this.props.gameState.currentScore,
      currentScore: this.props.gameState.awayScore,
      homeHits: this.props.gameState.currentHits,
      currentHits: this.props.gameState.awayHits,
      bench: this.props.gameState.awayBench,
      bullpen: this.props.gameState.awayBullpen,
      inningRuns: 0
    }
  }
  store.updateGameState(newState);
  socket.emit('update game state', newState);
}
