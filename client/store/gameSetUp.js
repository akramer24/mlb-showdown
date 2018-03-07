const defaultGame = {
  awayTeam: null,
  homeTeam: null,
  awayLineup: [],
  homeLineup: []
};

const SET_AWAY_LINEUP = 'SET_AWAY_LINEUP';
const SET_AWAY_TEAM = 'SET_AWAY_TEAM';
const SET_HOME_LINEUP = 'SET_HOME_LINEUP';
const SET_HOME_TEAM = 'SET_HOME_TEAM';

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
    default:
      return state;
  }
}