/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import reducer, { me, logout, auth, fetchInactiveUser, actions, fetchUserBatters, fetchUserPitchers, deleteUserBatter, deleteUserPitcher, userBuyPack, gameOverGetCash, fetchMostRecentLineup, saveMostRecentLineup, fetchMostRecentRotation, saveMostRecentRotation } from './user';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';
import Trie from './utils/trie';

const middlewares = [thunkMiddleware.withExtraArgument({ axios, history })];
const mockStore = configureMockStore(middlewares);

const initialState = {
  activeUser: {
    userInfo: {},
    batters: [],
    pitchers: [],
    lineup: [],
    rotation: [],
    newPack: [],
    battersTrie: new Trie(),
    trieSearchResults: [],
    singleBatter: {}
  },
  inactiveUser: {
    userInfo: {},
    batters: [],
    pitchers: []
  },
  onlineUsers: []
};

const fakeUser = { teamName: 'brickmaaa', cash: 30 };
const fakeBatters = [{ id: 1, firstName: 'Pablo', lastName: 'Sanchez', name: 'Pablo Sanchez' }, { id: 2, firstName: 'Kenny', lastName: 'Kawaguchi', name: 'Kenny Kawaguchi' }];
const fakePitchers = [{ id: 1, firstName: 'Henry', lastName: 'Rowengartner', name: 'Henry Rowengartner' }, { id: 2, firstName: 'Chet', lastName: 'Steadman', name: 'Chet Steadman' }];
const pack = [{ id: 3, firstName: 'Roy', lastName: 'Hobbs', name: 'Roy Hobbs' }];
const lineup = [{ id: 1 }, { id: 2 }, { id: 3 }];
const rotation = [{ id: 1 }, { id: 2 }, { id: 3 }];


describe('thunk creators', () => {
  let store;
  let mockAxios;

  const expectThunkCreatorDispatches = action => {
    const dispatchedActions = store.getActions();
    expect(dispatchedActions[0].type).to.be.equal(action);
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  })

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  })

  describe('me', () => {
    it('eventually dispatches the GET_ACTIVE_USER action', () => {
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser);
      return store.dispatch(me())
        .then(() => {
          const dispatchedActions = store.getActions();
          expect(dispatchedActions[0].type).to.be.equal('GET_ACTIVE_USER');
          expect(dispatchedActions[0].user).to.be.deep.equal(fakeUser);
        })
    })
  })

  describe('auth', () => {
    it('eventually dispatches the GET_ACTIVE_USER action', () => {
      mockAxios.onPost('/auth/login').replyOnce(200, fakeUser);
      return store.dispatch(auth('chet@cubs.com', '123', 'login', 'the rocket'))
        .then(() => {
          const dispatchedActions = store.getActions();
          expect(dispatchedActions[0].type).to.be.equal('GET_ACTIVE_USER');
          expect(dispatchedActions[0].user).to.be.deep.equal(fakeUser);
        })
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', () => {
      mockAxios.onPost('/auth/logout').replyOnce(204, fakeUser);
      return store.dispatch(logout())
        .then(() => expectThunkCreatorDispatches('REMOVE_USER'));
    })
  })

  describe('fetchInactiveUser', () => {
    it('eventually dispatches the GET_INACTIVE_USER action', () => {
      mockAxios.onGet('/api/users/1').replyOnce(200, fakeUser);
      return store.dispatch(fetchInactiveUser(1))
        .then(() => expectThunkCreatorDispatches('GET_INACTIVE_USER'));
    })
  })

    describe('fetchUserBatters', () => {
      it('eventually dispatches the GET_ACTIVE_USER_BATTERS action if user is active', () => {
        mockAxios.onGet('/api/users/1/batters').replyOnce(200, fakeBatters);
        return store.dispatch(fetchUserBatters(1, true))
          .then(() => expectThunkCreatorDispatches('GET_ACTIVE_USER_BATTERS'));
      })

      it('eventually dispatches the GET_INACTIVE_USER_BATTERS action if user is inactive', () => {
        mockAxios.onGet('/api/users/2/batters').replyOnce(200, fakeBatters);
        return store.dispatch(fetchUserBatters(2, false))
          .then(() => expectThunkCreatorDispatches('GET_INACTIVE_USER_BATTERS'));
      })
    })

    describe('fetchUserPitchers', () => {
      it('eventually dispatches the GET_ACTIVE_USER_PITCHERS action if user is active', () => {
        mockAxios.onGet('/api/users/1/pitchers').replyOnce(200, fakePitchers);
        return store.dispatch(fetchUserPitchers(1, true))
          .then(() => expectThunkCreatorDispatches('GET_ACTIVE_USER_PITCHERS'));
      })

      it('eventually dispatches the GET_INACTIVE_USER_PITCHERS action if user is inactive', () => {
        mockAxios.onGet('/api/users/2/pitchers').replyOnce(200, fakePitchers);
        return store.dispatch(fetchUserPitchers(2, false))
          .then(() => expectThunkCreatorDispatches('GET_INACTIVE_USER_PITCHERS'));
      })
    })

    describe('deleteUserBatter', () => {
      it('eventually dispatches the DELETE_ACTIVE_USER_BATTER action', () => {
        mockAxios.onDelete('/api/users/1/remove-batter/1').replyOnce(204);
        return store.dispatch(deleteUserBatter(1, 1))
          .then(() => expectThunkCreatorDispatches('DELETE_ACTIVE_USER_BATTER'));
      })
    })

    describe('deleteUserPitcher', () => {
      it('eventually dispatches the DELETE_ACTIVE_USER_PITCHER action', () => {
        mockAxios.onDelete('/api/users/1/remove-pitcher/1').replyOnce(204);
        return store.dispatch(deleteUserPitcher(1, 1))
          .then(() => expectThunkCreatorDispatches('DELETE_ACTIVE_USER_PITCHER'));
      })
    })

    describe('userBuyPack', () => {
      it('eventually dispatches the BUY_PACK action', () => {
        mockAxios.onPost('/api/users/1/buy-pack').replyOnce(200, pack);
        return store.dispatch(userBuyPack(1))
          .then(() => expectThunkCreatorDispatches('BUY_PACK'));
      })
    })

    describe('gameOverGetCash', () => {
      it('eventually dispatches the GET_ACTIVE_USER action', () => {
        mockAxios.onPut('/api/users/1').replyOnce(200, fakeUser);
        return store.dispatch(gameOverGetCash(1, 35, 10, 1, true))
          .then(() => expectThunkCreatorDispatches('GET_ACTIVE_USER'))
      })
    })

    describe('fetchMostRecentLineup', () => {
      it('eventually dispatches the GET_MOST_RECENT_LINEUP action', () => {
        mockAxios.onGet('/api/users/1/lineup').replyOnce(200, lineup);
        return store.dispatch(fetchMostRecentLineup(1))
          .then(() => expectThunkCreatorDispatches('GET_MOST_RECENT_LINEUP'))
      })
    })

    describe('saveMostRecentLineup', () => {
      it('eventually dispatches the GET_MOST_RECENT_LINEUP action', () => {
        mockAxios.onPut('/api/users/1/lineup').replyOnce(200, lineup);
        return store.dispatch((saveMostRecentLineup(1)))
          .then(() => expectThunkCreatorDispatches('GET_MOST_RECENT_LINEUP'));
      })
    })

    describe('fetchMostRecentRotation', () => {
      it('eventually dispatches the GET_MOST_RECENT_ROTATION action', () => {
        mockAxios.onGet('/api/users/1/rotation').replyOnce(200, rotation);
        return store.dispatch(fetchMostRecentRotation(1))
          .then(() => expectThunkCreatorDispatches('GET_MOST_RECENT_ROTATION'))
      })
    })

    describe('saveMostRecentRotation', () => {
      it('eventually dispatches the GET_MOST_RECENT_LINEUP action', () => {
        mockAxios.onPut('/api/users/1/rotation').replyOnce(200, rotation);
        return store.dispatch((saveMostRecentRotation(1)))
          .then(() => expectThunkCreatorDispatches('GET_MOST_RECENT_ROTATION'));
      })
    })

  })

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.be.deep.equal(
        {
          activeUser: {
            userInfo: {},
            batters: [],
            pitchers: [],
            lineup: [],
            rotation: [],
            newPack: [],
            battersTrie: new Trie(),
            trieSearchResults: [],
            singleBatter: {}
          },
          inactiveUser: {
            userInfo: {},
            batters: [],
            pitchers: []
          },
          onlineUsers: []
        }
      );
    })

    it('should handle GET_ACTIVE_USER', () => {
      const action = { type: actions.GET_ACTIVE_USER, user: fakeUser };
      const newState = { ...initialState, activeUser: { ...initialState.activeUser, userInfo: fakeUser } };
      expect(reducer(initialState, action)).to.be.deep.equal(newState);
    })

    it('should handle GET_INACTIVE_USER', () => {
      const action = { type: actions.GET_INACTIVE_USER, user: fakeUser };
      const newState = { ...initialState, inactiveUser: { ...initialState.inactiveUser, userInfo: fakeUser } };
      expect(reducer(initialState, action)).to.be.deep.equal(newState);
    })

    it('should handle REMOVE_USER', () => {
      const action = { type: actions.REMOVE_USER };
      const oldState = { ...initialState, activeUser: { ...initialState.activeUser, userInfo: fakeUser } };
      const newState = initialState;
      expect(reducer(oldState, action)).to.be.deep.equal(newState);
    })

    it('should handle GET_ACTIVE_USER_BATTERS', () => {
      const action = { type: actions.GET_ACTIVE_USER_BATTERS, batters: fakeBatters };
      const newState = { ...initialState, activeUser: { ...initialState.activeUser, batters: fakeBatters } };
      expect(reducer(initialState, action)).to.be.deep.equal(newState);
    })

    it('should handle GET_ACTIVE_USER_PITCHERS', () => {
      const action = { type: actions.GET_ACTIVE_USER_PITCHERS, pitchers: fakePitchers };
      const newState = { ...initialState, activeUser: { ...initialState.activeUser, pitchers: fakePitchers } };
      expect(reducer(initialState, action)).to.be.deep.equal(newState);
    })

    it('should handle GET_INACTIVE_USER_BATTERS', () => {
      const action = { type: actions.GET_INACTIVE_USER_BATTERS, batters: fakeBatters };
      const newState = { ...initialState, inactiveUser: { ...initialState.inactiveUser, batters: fakeBatters } };
      expect(reducer(initialState, action)).to.be.deep.equal(newState);
    })

    it('should handle GET_INACTIVE_USER_PITCHERS', () => {
      const action = { type: actions.GET_INACTIVE_USER_PITCHERS, pitchers: fakePitchers };
      const newState = { ...initialState, inactiveUser: { ...initialState.inactiveUser, pitchers: fakePitchers } };
      expect(reducer(initialState, action)).to.be.deep.equal(newState);
    })

    it('should handle DELETE_ACTIVE_USER_BATTER', () => {
      const action = { type: actions.DELETE_ACTIVE_USER_BATTER, batterId: 1 };
      const oldState = { ...initialState, activeUser: { ...initialState.activeUser, batters: fakeBatters } };
      const newState = { ...oldState, activeUser: { ...oldState.activeUser, batters: [{ id: 2, firstName: 'Kenny', lastName: 'Kawaguchi', name: 'Kenny Kawaguchi' }] } };
      expect(reducer(oldState, action)).to.be.deep.equal(newState);
    })

    it('should handle DELETE_ACTIVE_USER_PITCHER', () => {
      const action = { type: actions.DELETE_ACTIVE_USER_PITCHER, pitcherId: 1 };
      const oldState = { ...initialState, activeUser: { ...initialState.activeUser, pitchers: fakePitchers } };
      const newState = { ...oldState, activeUser: { ...oldState.activeUser, pitchers: [{ id: 2, firstName: 'Chet', lastName: 'Steadman', name: 'Chet Steadman' }] } };
      expect(reducer(oldState, action)).to.be.deep.equal(newState);
    })

    it('should handle BUY_PACK', () => {
      const action = { type: actions.BUY_PACK, pack };
      const oldState = { ...initialState, activeUser: { ...initialState.activeUser, userInfo: fakeUser } }
      const newState = { ...oldState, activeUser: { ...oldState.activeUser, userInfo: { ...oldState.activeUser.userInfo, cash: 25 }, newPack: pack } };
      expect(reducer(oldState, action)).to.be.deep.equal(newState);
    })

    it('should handle CLEAR_PACK', () => {
      const action = { type: actions.CLEAR_PACK };
      const oldState = { ...initialState, activeUser: { ...initialState.activeUser, userInfo: fakeUser, newPack: pack } };
      const newState = { ...oldState, activeUser: { ...oldState.activeUser, newPack: [] } };
      expect(reducer(oldState, action)).to.be.deep.equal(newState);
    })

    it('should handle ADD_ONLINE_USER', () => {
      const onlineUsers = [{ id: 1 }, { id: 2 }]
      const action = { type: actions.ADD_ONLINE_USER, onlineUsers };
      const newState = { ...initialState, onlineUsers };
      expect(reducer(initialState, action)).to.be.deep.equal(newState);
    })

    it('should handle REMOVE_ONLINE_USER', () => {
      const oldOnlineUsers = [{ id: 1 }, { id: 2 }];
      const newOnlineUsers = [{ id: 1 }];
      const action = { type: actions.REMOVE_ONLINE_USER, onlineUsers: newOnlineUsers };
      const oldState = { ...initialState, onlineUsers: oldOnlineUsers };
      const newState = { ...oldState, onlineUsers: newOnlineUsers };
      expect(reducer(oldState, action)).to.be.deep.equal(newState);
    })

    it('should handle SET_USER_SOCKET', () => {
      const action = { type: actions.SET_USER_SOCKET, socketId: 123 };
      const newState = { ...initialState, activeUser: { ...initialState.activeUser, socketId: 123 } };
      expect(reducer(initialState, action)).to.be.deep.equal(newState);
    })

    it('should handle GET_MOST_RECENT_LINEUP', () => {
      const action = { type: actions.GET_MOST_RECENT_LINEUP, lineup };
      const newState = { ...initialState, activeUser: { ...initialState.activeUser, lineup } };
      expect(reducer(initialState, action)).to.be.deep.equal(newState);
    })

    it('should handle GET_MOST_RECENT_ROTATION', () => {
      const action = { type: actions.GET_MOST_RECENT_ROTATION, rotation };
      const newState = { ...initialState, activeUser: { ...initialState.activeUser, rotation } };
      expect(reducer(initialState, action)).to.be.deep.equal(newState);
    })

    it('should handle SEARCH_FOR_USER_BATTER', () => {
      const battersTrie = new Trie();
      battersTrie.buildTrie([{ name: 'Bobby Bonilla' }, { name: 'Bobby Brown' }, { name: 'Bo Jackson' }]);
      const action = { type: actions.SEARCH_FOR_USER_BATTER, search: 'bob' };
      const oldState = { ...initialState, activeUser: { ...initialState.activeUser, battersTrie } };
      const newState = { ...oldState, activeUser: { ...oldState.activeUser, trieSearchResults: ['Bobby Bonilla', 'Bobby Brown'] } };
      expect(reducer(oldState, action)).to.be.deep.equal(newState);
    })

    it('should handle GET_SEARCHED_USER_BATTER', () => {
      const action = { type: actions.GET_SEARCHED_USER_BATTER, name: 'Pablo Sanchez' };
      const oldState = { ...initialState, activeUser: { ...initialState.activeUser, batters: fakeBatters } };
      const newState = { ...oldState, activeUser: { ...oldState.activeUser, singleBatter: { id: 1, firstName: 'Pablo', lastName: 'Sanchez', name: 'Pablo Sanchez' } } };
      expect(reducer(oldState, action)).to.be.deep.equal(newState);
    })

    it('should handle CLEAR_USER_BATTER', () => {
      const action = { type: actions.CLEAR_USER_BATTER };
      const oldState = { ...initialState, activeUser: { ...initialState.activeUser, singleBatter: { id: 1, firstName: 'Pablo', lastName: 'Sanchez', name: 'Pablo Sanchez' } } };
      const newState = { ...oldState, activeUser: { ...oldState.activeUser, singleBatter: {} } };
      expect(reducer(oldState, action)).to.be.deep.equal(newState);
    })

  })
