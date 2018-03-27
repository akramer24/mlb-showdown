import socket from '../../../socket';
import store, { updateGameState } from '../../../store';

export function handleNextInning() {
  const { half, inning, currentOrder, homeOrder, awayPitcher, currentScore,
    homeScore, currentHits, homeHits, homeBench, homeBullpen,
    awayOrder, homePitcher, awayScore, awayHits, awayBench, awayBullpen, homeTeam } = this.props.gameState;
  const newInning = inning + 1;
  let newState = {};
  if (half == 'top') {
    newState = {
      awayOrder: currentOrder,
      result: '',
      totalPAs: 0,
      half: 'bottom',
      outs: 0,
      first: '',
      second: '',
      third: '',
      currentOrder: homeOrder,
      batter: homeOrder[0],
      pitcher: awayPitcher,
      awayScore: currentScore,
      currentScore: homeScore,
      awayHits: currentHits,
      currentHits: homeHits,
      bench: homeBench,
      bullpen: awayBullpen,
      inningRuns: 0
    }
  } else if (half == 'bottom') {
    newState = {
      homeOrder: currentOrder,
      half: 'top',
      result: '',
      totalPAs: 0,
      outs: 0,
      inning: newInning,
      first: '',
      second: '',
      third: '',
      currentOrder: awayOrder,
      batter: awayOrder[0],
      pitcher: homePitcher,
      homeScore: currentScore,
      currentScore: awayScore,
      homeHits: currentHits,
      currentHits: awayHits,
      bench: awayBench,
      bullpen: homeBullpen,
      inningRuns: 0
    }
  }
  socket.emit('update game state', newState, homeTeam);
  // store.dispatch(updateGameState(newState));
}
