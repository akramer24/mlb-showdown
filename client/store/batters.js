import axios from 'axios';

const defaultState = {
  batters: [],
  singleBatter: {}
}

const GET_BATTERS = 'GET_BATTERS';
const CREATE_BATTER = 'CREATE_BATTER';
const REMOVE_BATTER = 'REMOVE_BATTER';
const GET_BATTER = 'GET_BATTER';

export function getBatters(batters) {
  return {
    type: GET_BATTERS,
    batters
  }
}

export function createBatter(batter) {
  return {
    type: CREATE_BATTER,
    batter
  }
}

export function removeBatter(batter) {
  return {
    type: REMOVE_BATTER,
    batter
  }
}

export function getBatter(batter) {
  return {
    type: GET_BATTER,
    batter
  }
}

export function fetchBatters() {
  return function thunk(dispatch) {
    return axios.get('/api/batters')
      .then(res => res.data)
      .then(batters => dispatch(getBatters(batters)))
      .catch(err => console.error(err))
  }
}

// export function fetchUserBatters(id) {
//   return function thunk(dispatch) {
//     return axios.get(`/api/users/${id}/batters`)
//       .then(res => res.data)
//       .then(batters => dispatch(getBatters(batters)))
//       .catch(err => console.error(err))
//   }
// }

export function fetchBatter(id) {
  return function thunk(dispatch) {
    return axios.get(`/api/batters/${id}`)
      .then(res => res.data)
      .then(batter => dispatch(getBatter(batter)))
      .catch(console.error);
  }
}

export default function battersReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_BATTERS:
      return { ...state, batters: action.batters };
    case CREATE_BATTER:
      return { ...state, batters: [...state.batters, action.batter] };
    case REMOVE_BATTER:
      return {
        ...state, batters: state.batters.filter(batter => {
          if (batter) return batter.id !== action.batter.id;
        })
      }
    case GET_BATTER:
      return { ...state, singleBatter: action.batter };
    default:
      return state;
  }
}