const defaultState = {
  turn: '',
  roll: null,
  result: '',
  printResult: '',
  totalPAs: 0,
  half: 'top',
  inning: 1,
  outs: 0,
  awayOrder: [],
  homeOrder: [],
  currentOrder: [],
  awayPitcher: {},
  homePitcher: {},
  batter: {},
  pitcher: {},
  first: '',
  second: '',
  third: '',
  awayScore: 0,
  homeScore: 0,
  currentScore: 0,
  inningRuns: 0,
  awayHits: 0,
  homeHits: 0,
  currentHits: 0,
  awayTeam: '',
  homeTeam: '',
  batterAttributes: false,
  pitcherAttributes: false,
  awayBench: [],
  homeBench: [],
  bench: [],
  awayBullpen: [],
  homeBullpen: [],
  bullpen: [],
  displayBench: false,
  displayBullpen: false,
  isGameOver: false,
  displayRules: true,
  userSocketId: null,
  challengerSocketId: null,
  videoRoomCreated: false,
  displayVideo: false,
  videoRequestSentBy: null,
  videoRequestAcceptedBy: null
}

const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE';
const RESET_GAME_STATE = 'RESET_GAME_STATE';

export const updateGameState = newState => ({ type: UPDATE_GAME_STATE, newState });
export const resetGameState = () => ({ type: RESET_GAME_STATE });

export default function (state = defaultState, action) {
  switch (action.type) {
    case UPDATE_GAME_STATE:
      return { ...state, ...action.newState };
    case RESET_GAME_STATE:
      return defaultState;
    default:
      return state;
  }
}