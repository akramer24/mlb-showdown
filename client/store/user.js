import axios from 'axios';
import history from '../history';
import socket from '../socket';
import Trie from './utils/trie';

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
const CLEAR_PACK = 'CLEAR_PACK';
const ADD_ONLINE_USER = 'ADD_ONLINE_USER';
const REMOVE_ONLINE_USER = 'REMOVE_ONLINE_USER';
const SET_USER_SOCKET = 'SET_USER_SOCKET';
const GET_MOST_RECENT_LINEUP = 'GET_MOST_RECENT_LINEUP';
const GET_MOST_RECENT_ROTATION = 'GET_MOST_RECENT_ROTATION';
const SEARCH_FOR_USER_BATTER = 'SEARCH_FOR_USER_BATTER';


/**
 * INITIAL STATE
 */
const defaultUser = {
  activeUser: {
    userInfo: {},
    batters: [],
    pitchers: [],
    lineup: [],
    rotation: [],
    newPack: [],
    battersTrie: new Trie(),
    trieSearchResults: []
  },
  inactiveUser: {
    userInfo: {},
    batters: [],
    pitchers: []
  },
  onlineUsers: []
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
const clearPack = () => ({ type: CLEAR_PACK })

export function addOnlineUser(onlineUsers) {
  return {
    type: ADD_ONLINE_USER,
    onlineUsers
  }
}

export function removeOnlineUser(onlineUsers) {
  return {
    type: REMOVE_ONLINE_USER,
    onlineUsers
  }
}

export function setUserSocket(socketId) {
  return {
    type: SET_USER_SOCKET,
    socketId
  }
}

export function getMostRecentLineup(lineup) {
  return {
    type: GET_MOST_RECENT_LINEUP,
    lineup
  }
}

export function getMostRecentRotation(rotation) {
  return {
    type: GET_MOST_RECENT_ROTATION,
    rotation
  }
}

export function searchForUserBatter(search) {
  return {
    type: SEARCH_FOR_USER_BATTER,
    search
  }
}

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        dispatch(getActiveUser(res.data || defaultUser))
        socket.emit('add online user', res.data)
      })
      .catch(err => console.log(err))

export const auth = (email, password, method, teamName) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, teamName })
      .then(res => {
        dispatch(getActiveUser(res.data))
        socket.emit('add online user', res.data)
        history.push('/')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getActiveUser({ error: authError }))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser())
        socket.emit('remove online user', res.data.teamName)
        history.push('/')
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
    return axios.get(`/api/users/${Number(id)}/pitchers`)
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
      .then(res => res.data)
      .then(pack => {
        dispatch(buyPack(pack))
      })
      .catch(console.error)
  }
}

export function removePack() {
  return function (dispatch) {
    dispatch(clearPack())
  }
}

export function gameOverGetCash(userId, userCash, wins, losses, isWinner) {
  return function (dispatch) {
    let cash = isWinner ? (10 + Number(userCash)) : (3 + Number(userCash));
    let record = isWinner ? 'wins' : 'losses';
    let newRecord = isWinner ? ++wins : ++losses;
    return axios.put(`/api/users/${userId}`, { cash, [record]: newRecord })
      .then(res => dispatch(getActiveUser(res.data)))
      .catch(console.error);
  }
}

export function fetchMostRecentLineup(userId) {
  return function (dispatch) {
    return axios.get(`/api/users/${userId}/lineup`)
      .then(res => {
        if (res.data) dispatch(getMostRecentLineup(res.data));
      })
      .catch(console.error);
  }
}

export function saveMostRecentLineup(userId, lineup) {
  return function (dispatch) {
    return axios.put(`/api/users/${userId}/lineup`, { mostRecentLineup: lineup })
      .then(res => dispatch(getMostRecentLineup(res.data)))
      .catch(console.error);
  }
}

export function fetchMostRecentRotation(userId) {
  return function (dispatch) {
    return axios.get(`/api/users/${userId}/rotation`)
      .then(res => {
        if (res.data) dispatch(getMostRecentRotation(res.data));
      })
      .catch(console.error);
  }
}

export function saveMostRecentRotation(userId, rotation) {
  return function (dispatch) {
    return axios.put(`/api/users/${userId}/rotation`, { mostRecentRotation: rotation })
      .then(res => dispatch(getMostRecentRotation(res.data)))
      .catch(console.error);
  }
}

function sortByLastName(array) {
  array.sort((a, b) => {
    const nameA = a.lastName.toUpperCase();
    const nameB = b.lastName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
  return array
}


/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_ACTIVE_USER:
      return { ...state, activeUser: { ...state.activeUser, userInfo: action.user } };
    case GET_INACTIVE_USER:
      return { ...state, inactiveUser: { ...state.inactiveUser, userInfo: action.user } };
    case REMOVE_USER:
      return defaultUser;
    case GET_ACTIVE_USER_BATTERS:
      return { ...state, activeUser: { ...state.activeUser, batters: sortByLastName(action.batters), battersTrie: state.activeUser.battersTrie.buildTrie(action.batters) } };
    case GET_ACTIVE_USER_PITCHERS:
      return { ...state, activeUser: { ...state.activeUser, pitchers: sortByLastName(action.pitchers) } };
    case GET_INACTIVE_USER_BATTERS:
      return { ...state, inactiveUser: { ...state.inactiveUser, batters: sortByLastName(action.batters) } };
    case GET_INACTIVE_USER_PITCHERS:
      return { ...state, inactiveUser: { ...state.inactiveUser, pitchers: sortByLastName(action.pitchers) } };
    case DELETE_ACTIVE_USER_BATTER:
      return { ...state, activeUser: { ...state.activeUser, batters: state.activeUser.batters.filter(batter => action.batterId !== batter.id) } }
    case DELETE_ACTIVE_USER_PITCHER:
      return { ...state, activeUser: { ...state.activeUser, pitchers: state.activeUser.pitchers.filter(pitcher => action.pitcherId !== pitcher.id) } }
    case BUY_PACK:
      return {
        ...state, activeUser: {
          ...state.activeUser,
          userInfo: { ...state.activeUser.userInfo, cash: (Number(state.activeUser.userInfo.cash) - 5) },
          newPack: action.pack
        }
      }
    case CLEAR_PACK:
      return {
        ...state, activeUser: { ...state.activeUser, newPack: [] }
      }
    case ADD_ONLINE_USER:
      return { ...state, onlineUsers: action.onlineUsers };
    case SET_USER_SOCKET:
      return { ...state, activeUser: { ...state.activeUser, socketId: action.socketId } };
    case REMOVE_ONLINE_USER:
      return { ...state, onlineUsers: action.onlineUsers };
    case GET_MOST_RECENT_LINEUP: {
      return { ...state, activeUser: { ...state.activeUser, lineup: action.lineup } };
    }
    case GET_MOST_RECENT_ROTATION: {
      return { ...state, activeUser: { ...state.activeUser, rotation: action.rotation } };
    }
    case SEARCH_FOR_USER_BATTER: {
      return { ...state, activeUser: { ...state.activeUser, trieSearchResults: state.activeUser.battersTrie.searchFor(action.search) } }
    }
    default:
      return state;
  }
}
