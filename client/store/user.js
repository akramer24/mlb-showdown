import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const GET_USER_BATTERS = 'GET_USER_BATTERS';

/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  batters: [],
  pitchers: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
export function getUserBatters(batters) {
  return {
    type: GET_USER_BATTERS,
    batters
  }
}

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method, teamName) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, teamName })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
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

export function fetchUserBatters(id) {
  return function thunk(dispatch) {
    return axios.get(`/api/users/${id}/batters`)
      .then(res => res.data)
      .then(batters => dispatch(getUserBatters(batters)))
      .catch(err => console.error(err))
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return defaultUser;
    case GET_USER_BATTERS:
      return { ...state, batters: action.batters }
    default:
      return state;
  }
}
