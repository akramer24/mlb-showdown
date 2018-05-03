import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import batters from './batters';
import pitchers from './pitchers';
import gameSetUp from './gameSetUp';
import play from './play';
import challenges from './challenge';

export const reducer = combineReducers({
  user,
  batters,
  pitchers,
  gameSetUp,
  play,
  challenges
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

export default store;
export * from './user';
export * from './batters';
export * from './pitchers';
export * from './gameSetUp';
export * from './play';
export * from './challenge';
