const defaultGame = {
  awayTeam: '',
  homeTeam: '',
  awayLineup: [],
  homeLineup: [],
  awayRotation: [],
  homeRotation: [],
  isLineupSet: false
};

const SET_AWAY_TEAM = 'SET_AWAY_TEAM';
const SET_AWAY_LINEUP = 'SET_AWAY_LINEUP';
const SET_AWAY_ROTATION = 'SET_AWAY_ROTATION';
const SET_HOME_TEAM = 'SET_HOME_TEAM';
const SET_HOME_LINEUP = 'SET_HOME_LINEUP';
const SET_HOME_ROTATION = 'SET_HOME_ROTATION';
const TOGGLE_LINEUP_SET = 'TOGGLE_LINEUP_SET';

export function setAwayLineup(lineup) {
  return {
    type: SET_AWAY_LINEUP,
    lineup
  }
}

export function setAwayRotation(rotation) {
  return {
    type: SET_AWAY_ROTATION,
    rotation
  }
}

export function setAwayTeam(name) {
  return {
    type: SET_AWAY_TEAM,
    name
  }
}

export function setHomeLineup(lineup) {
  return {
    type: SET_HOME_LINEUP,
    lineup
  }
}

export function setHomeRotation(rotation) {
  return {
    type: SET_HOME_ROTATION,
    rotation
  }
}

export function setHomeTeam(name) {
  return {
    type: SET_HOME_TEAM,
    name
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
    isHome ? dispatch(setHomeLineup(lineup)) : dispatch(setAwayLineup(lineup));
    if (!isComputer) dispatch(toggleLineupSet(bool));
  }
}

export function setRotation(rotation, isHome) {
  return function(dispatch) {
    isHome ? dispatch(setHomeRotation(rotation)) : dispatch(setAwayRotation(rotation));
  }
}

export default function gameSetUp(state = defaultGame, action) {
  switch (action.type) {
    case SET_AWAY_LINEUP:
      return { ...state, awayLineup: action.lineup };
    case SET_AWAY_TEAM:
      return { ...state, awayTeam: action.name };
    case SET_AWAY_ROTATION:
      return { ...state, awayRotation: action.rotation };
    case SET_HOME_LINEUP:
      return { ...state, homeLineup: action.lineup };
    case SET_HOME_TEAM:
      return { ...state, homeTeam: action.name };
    case SET_HOME_ROTATION:
      return { ...state, homeRotation: action.rotation }
    case TOGGLE_LINEUP_SET:
      return { ...state, isLineupSet: action.bool }
    default:
      return state;
  }
}