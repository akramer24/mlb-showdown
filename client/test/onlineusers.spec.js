import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { OnlineUsers } from '../components/OnlineUsers';

describe('<OnlineUsers />', () => {
  let sentChallenges;

  before(() => {
    sentChallenges = [{ to: { teamName: 'james' }, from: { teamName: 'ari' } }]
  })
  
  describe('When user has enough players and other users are online', () => {
    let wrapper;
    before(() => {
      const activeUser = { userInfo: { id: 1, teamName: 'ari' }, batters: [1, 2, 3, 4, 5, 6, 7, 8, 9], pitchers: [1, 2] };
      const onlineUsers = [{ teamName: 'ari' }, { teamName: 'jesse' }, { teamName: 'james' }];
      const props = { onlineUsers, activeUser, sentChallenges };
      wrapper = shallow(<OnlineUsers {...props} />)
    })

    it('renders a div with id "online-users', () => {
      expect(wrapper.is('#online-users')).to.equal(true);
    })

    it('renders list of online users, excluding client', () => {
      const online = wrapper.find('.online-user').map(user => user.text());
      expect(online[0]).to.equal('jesse vs.')
    })

    it('renders the appropriate number of online users', () => {
      expect(wrapper.find('.online-user').length).to.equal(2)
    })
  })

  describe('When user has enough players but no other users are online', () => {
    let wrapper;
    before(() => {
      const activeUser = { userInfo: { id: 1, teamName: 'ari' }, batters: [1, 2, 3, 4, 5, 6, 7, 8, 9], pitchers: [1, 2] };
      const onlineUsers = [];
      const props = { onlineUsers, activeUser, sentChallenges };
      wrapper = shallow(<OnlineUsers {...props} />)
    })

    it('does not render the div with id "online-users-list"', () => {
      expect(wrapper.find('#online-users-list').length).to.equal(0);
    })

    it('renders the div with id "no-online-users"', () => {
      expect(wrapper.find('#no-online-users').length).to.equal(1);
    })

    it('the div with id "no-online-users" has NavLink to user page', () => {
      const link = wrapper.find('#no-online-users NavLink');
      expect(link.props().to).to.equal('/users/1');
    })
  })

  describe('When user does not have enough players and other users are online', () => {
    let wrapper;
    before(() => {
      const activeUser = { userInfo: { id: 1, teamName: 'ari' }, batters: [1, 2, 3, 4, 5], pitchers: [1, 2] };
      const onlineUsers = [{ teamName: 'ari' }, { teamName: 'jesse' }, { teamName: 'james' }];
      const props = { onlineUsers, activeUser, sentChallenges };
      wrapper = shallow(<OnlineUsers {...props} />)
    })

    it('does not initially render the error box', () => {
      expect(wrapper.find('#not-enough-players-error-box').length).to.equal(0);
    })

    it('renders the error box after the "vs-button" is clicked', () => {
      const buttons = wrapper.find('.vs-button').map(button => button);
      buttons[0].simulate('click');
      expect(wrapper.find('#not-enough-players-error-box').length).to.equal(1);
    })
  })
})