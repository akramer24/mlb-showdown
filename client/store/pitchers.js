import axios from 'axios';

const defaultState = {
  pitchers: [],
  singlePitcher: {}
}

const GET_PITCHERS = 'GET_PITCHERS';
const REMOVE_PITCHER = 'REMOVE_PITCHER';
const GET_PITCHER = 'GET_PITCHER';

export function getPitchers(pitchers) {
  return {
    type: GET_PITCHERS,
    pitchers
  }
}

export function removePitcher(pitcher) {
  return {
    type: REMOVE_PITCHER,
    pitcher
  }
}

export function getPitcher(pitcher) {
  return {
    type: GET_PITCHER,
    pitcher
  }
}

export function fetchPitchers() {
  return function thunk(dispatch) {
    return axios.get('/api/pitchers')
      .then(res => res.data)
      .then(batters => dispatch(getPitchers(batters)))
      .catch(console.error);
  }
}

export function fetchUserPitchers(id) {
  return function thunk(dispatch) {
    return axios.get(`/api/users/${id}/pitchers`)
      .then(res => res.data)
      .then(pitchers => dispatch(getPitchers(pitchers)))
      .catch(err => console.error(err))
  }
}

export function fetchPitcher(id) {
  return function thunk(dispatch) {
    return axios.get(`/api/pitchers/${id}`)
      .then(res => res.data)
      .then(pitcher => dispatch(getPitcher(pitcher)))
      .catch(console.error);
  }
}

export default function pitchersReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_PITCHERS:
      return { ...state, pitchers: action.pitchers };
    case REMOVE_PITCHER:
      return { ...state, pitchers: state.pitchers.filter(pitcher => pitcher.id !== action.pitcher.id) };
    case GET_PITCHER:
      return { ...state, singlePitcher: action.pitcher };
    default:
      return state;
  }
}