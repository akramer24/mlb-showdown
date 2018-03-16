const defaultGame = {
  awayTeam: null,
  homeTeam: null,
  awayLineup: [],
  homeLineup: [],
  isLineupSet: false
};

const SET_AWAY_LINEUP = 'SET_AWAY_LINEUP';
const SET_AWAY_TEAM = 'SET_AWAY_TEAM';
const SET_HOME_LINEUP = 'SET_HOME_LINEUP';
const SET_HOME_TEAM = 'SET_HOME_TEAM';
const TOGGLE_LINEUP_SET = 'TOGGLE_LINEUP_SET';

export function setAwayLineup(lineup) {
  return {
    type: SET_AWAY_LINEUP,
    lineup
  }
}

export function setAwayTeam(userId) {
  return {
    type: SET_AWAY_TEAM,
    userId
  }
}

export function setHomeLineup(lineup) {
  return {
    type: SET_HOME_LINEUP,
    lineup
  }
}

export function setHomeTeam(userId) {
  return {
    type: SET_HOME_TEAM,
    userId
  }
}

export function toggleLineupSet(bool) {
  return {
    type: TOGGLE_LINEUP_SET,
    bool
  }
}

export function setLineup(lineup, isHome, bool, isComputer) {
  return function(dispatch) {
    isHome ? dispatch(setHomeLineup(lineup)) : dispatch(setAwayLineup(lineup))
    if (!isComputer) dispatch(toggleLineupSet(bool))
  }
}

export default function gameSetUp(state = defaultGame, action) {
  switch (action.type) {
    case SET_AWAY_LINEUP:
      return { ...state, awayLineup: action.lineup };
    case SET_AWAY_TEAM:
      return { ...state, awayTeam: action.userId };
    case SET_HOME_LINEUP:
      return { ...state, homeLineup: action.lineup };
    case SET_HOME_TEAM:
      return { ...state, homeTeam: action.userId };
    case TOGGLE_LINEUP_SET:
      return { ...state, isLineupSet: action.bool }
    default:
      return state;
  }
}