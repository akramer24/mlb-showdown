import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ACTIVE_USER = 'GET_ACTIVE_USER';
const GET_INACTIVE_USER = 'GET_INACTIVE_USER';
const REMOVE_USER = 'REMOVE_USER';
const GET_ACTIVE_USER_BATTERS = 'GET_ACTIVE_USER_BATTERS';
const GET_ACTIVE_USER_PITCHERS = 'GET_ACTIVE_USER_PITCHERS';
const GET_INACTIVE_USER_BATTERS = 'GET_INACTIVE_USER_BATTERS';
const GET_INACTIVE_USER_PITCHERS = 'GET_INACTIVE_USER_PITCHERS';
const DELETE_ACTIVE_USER_BATTER = 'DELETE_ACTIVE_USER_BATTER';
const DELETE_ACTIVE_USER_PITCHER = 'DELETE_ACTIVE_USER_PITCHER';
const BUY_PACK = 'BUY_PACK';

/**
 * INITIAL STATE
 */
const defaultUser = {
  activeUser: {
    userInfo: {},
    batters: [],
    pitchers: []
  },
  inactiveUser: {
    userInfo: {},
    batters: [],
    pitchers: []
  }
}

/**
 * ACTION CREATORS
 */
const getActiveUser = user => ({ type: GET_ACTIVE_USER, user })
const getInactiveUser = user => ({ type: GET_INACTIVE_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
export function getActiveUserBatters(batters) {
  return {
    type: GET_ACTIVE_USER_BATTERS,
    batters
  }
}

export function getActiveUserPitchers(pitchers) {
  return {
    type: GET_ACTIVE_USER_PITCHERS,
    pitchers
  }
}

export function getInactiveUserBatters(batters) {
  return {
    type: GET_INACTIVE_USER_BATTERS,
    batters
  }
}

export function getInactiveUserPitchers(pitchers) {
  return {
    type: GET_INACTIVE_USER_PITCHERS,
    pitchers
  }
}

export function deleteActiveUserBatter(batterId) {
  return {
    type: DELETE_ACTIVE_USER_BATTER,
    batterId
  }
}

export function deleteActiveUserPitcher(pitcherId) {
  return {
    type: DELETE_ACTIVE_USER_PITCHER,
    pitcherId
  }
}

export function buyPack(pack) {
  return {
    type: BUY_PACK,
    pack
  }
}

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getActiveUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method, teamName) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, teamName })
      .then(res => {
        dispatch(getActiveUser(res.data))
        history.push('/')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getActiveUser({ error: authError }))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const fetchInactiveUser = id =>
  dispatch =>
    axios.get(`/api/users/${id}`)
      .then(res => {
        dispatch(getInactiveUser(res.data))
      })
      .catch(err => console.error(err))

export function fetchUserBatters(id, active) {
  return function thunk(dispatch) {
    return axios.get(`/api/users/${id}/batters`)
      .then(res => res.data)
      .then(batters => {
        active
          ? dispatch(getActiveUserBatters(batters))
          : dispatch(getInactiveUserBatters(batters))
      })
      .catch(err => console.error(err))
  }
}

export function fetchUserPitchers(id, active) {
  return function thunk(dispatch) {
    return axios.get(`/api/users/${id}/pitchers`)
      .then(res => res.data)
      .then(pitchers => {
        active
          ? dispatch(getActiveUserPitchers(pitchers))
          : dispatch(getInactiveUserPitchers(pitchers))
      })
      .catch(err => console.error(err))
  }
}

export function deleteUserBatter(userId, batterId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/users/${userId}/remove-batter/${batterId}`)
      .then(() => dispatch(deleteActiveUserBatter(batterId)))
      .catch(console.error);
  }
}

export function deleteUserPitcher(userId, pitcherId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/users/${userId}/remove-pitcher/${pitcherId}`)
      .then(() => dispatch(deleteActiveUserPitcher(pitcherId)))
      .catch(console.error);
  }
}

export function userBuyPack(userId) {
  return function thunk(dispatch) {
    return axios.post(`/api/users/${userId}/buy-pack`)
      .catch(console.error)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_ACTIVE_USER:
      return { ...state, activeUser: action.user };
    case GET_INACTIVE_USER:
      return { ...state, inactiveUser: { ...state.inactiveUser, userInfo: action.user } };
    case REMOVE_USER:
      return defaultUser;
    case GET_ACTIVE_USER_BATTERS:
      return { ...state, activeUser: { ...state.activeUser, batters: action.batters } };
    case GET_ACTIVE_USER_PITCHERS:
      return { ...state, activeUser: { ...state.activeUser, pitchers: action.pitchers } };
    case GET_INACTIVE_USER_BATTERS:
      return { ...state, inactiveUser: { ...state.inactiveUser, batters: action.batters } };
    case GET_INACTIVE_USER_PITCHERS:
      return { ...state, inactiveUser: { ...state.inactiveUser, pitchers: action.pitchers } };
    case DELETE_ACTIVE_USER_BATTER:
      return { ...state, activeUser: { ...state.activeUser, batters: state.activeUser.batters.filter(batter => action.batterId !== batter.id) } }
    case DELETE_ACTIVE_USER_PITCHER:
      return { ...state, activeUser: { ...state.activeUser, pitchers: state.activeUser.pitchers.filter(pitcher => action.pitcherId !== pitcher.id) } }
    default:
      return state;
  }
}
