import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { UserPage } from '../components/UserPage';
import { AllBatters, AllPitchers, NewPack, NewChallenge } from '../components';

describe('<UserPage />', () => {
  describe('User is on own page', () => {

    let wrapper;
    let storedWrapper;
    let match;
    let activeUser;
    let storedActiveUser;
    let challenges;
    let storedChallenges;
    let props;
    let storedProps;

    before(() => {
      match = { params: { userId: 1 } };
      activeUser = { userInfo: { id: 1, teamName: 'rowengartner', wins: 100, losses: 0, cash: 30 }, batters: [1, 2, 3, 4, 5, 6, 7, 8, 9], pitchers: [1, 2], newPack: [1, 2] };
      storedActiveUser = activeUser;
      challenges = [{ to: { teamName: 'rowengartner' }, from: { teamName: 'steadman' }, timeRemaining: 45 }]
      storedChallenges = challenges;
      props = { match, activeUser, challenges };
      storedProps = props;
      wrapper = shallow(<UserPage {...props} />, { disableLifecycleMethods: true });
      storedWrapper = wrapper;
    })

    it('renders a div with id "user-page', () => {
      expect(wrapper.is('#user-page')).to.equal(true);
    })

    it('renders the user\'s team name', () => {
      expect(wrapper.find('#user-page-team-name').text()).to.equal('rowengartner');
    })

    it('renders the user\'s record', () => {
      expect(wrapper.find('#user-page-user-record').text()).to.equal('Record: 100-0');
    })

    it('renders the user\'s cash', () => {
      expect(wrapper.find('#user-cash').text()).to.equal('Cash: $30')
    })

    it('does not initially display a new pack of cards', () => {
      expect(wrapper.find(NewPack).length).to.equal(0);
    })

    it('displays a new pack when state changes to {displayPack: true}', () => {
      wrapper.setState({ displayPack: true });
      expect(wrapper.find(NewPack).length).to.equal(1);
      wrapper.setState({ displayPack: false });
    })

    it('does not render buy pack button if user cash is < $5', () => {
      activeUser = { userInfo: { id: 1, teamName: 'rowengartner', wins: 100, losses: 0, cash: 0 }, batters: [1, 2, 3, 4, 5, 6, 7, 8, 9], pitchers: [1, 2] };
      props = { match, activeUser, challenges };
      wrapper = shallow(<UserPage {...props} />, { disableLifecycleMethods: true });
      expect(wrapper.find('#buy-pack-button').length).to.equal(0);
    })

    it('renders a <p> tag that warns the user that he does not have enough cash to buy a pack if cash < $5', () => {
      expect(wrapper.find('p #user-page-not-enough-money-warning').length).to.equal(1);
      wrapper = storedWrapper;
      activeUser = storedActiveUser;
      props = storedProps;
    })

    it('renders buy pack button if user cash is >= $5', () => {
      expect(wrapper.find('#buy-pack-button').length).to.equal(1);
    })

    it('renders a new pack after the "buy pack" button is clicked', () => {
      const onBuyPack = sinon.spy();
      wrapper = shallow(<UserPage {...props} buyPack={onBuyPack} />, { disableLifecycleMethods: true });
      const button = wrapper.find('#buy-pack-button');
      button.simulate('click');
      expect(wrapper.find(NewPack).length).to.equal(1);
      wrapper = storedWrapper;
    })

    it('renders the challenges the user has received', () => {
      expect(wrapper.find(NewChallenge).length).to.equal(1);
    })

    it('does not render any challenges if the user has not received any challenges', () => {
      challenges = [];
      props = { match, activeUser, challenges };
      wrapper = shallow(<UserPage {...props} />, { disableLifecycleMethods: true });
      expect(wrapper.find(NewChallenge).length).to.equal(0);
      challenges = storedChallenges;
      props = storedProps;
      wrapper = storedWrapper;
    })

    it('renders one <AllBatters /> component', () => {
      expect(wrapper.find(AllBatters).length).to.equal(1);
    })

    it('renders one <AllPitchers /> component', () => {
      expect(wrapper.find(AllPitchers).length).to.equal(1);
    })
  })

  describe('User is not on own page', () => {

    let wrapper;
    before(() => {
      const match = { params: { userId: 3 } };
      const activeUser = { userInfo: { id: 1, teamName: 'rowengartner', wins: 100, losses: 0, cash: 30 }, batters: [1, 2, 3, 4, 5, 6, 7, 8, 9], pitchers: [1, 2], newPack: [1, 2] };
      const inactiveUser = { userInfo: { id: 3, teamName: 'brickma', wins: 1, losses: 20, cash: 6 }, batters: [1, 2, 3, 4, 5, 6, 7, 8, 9], pitchers: [1, 2], newPack: [1, 2] };
      const challenges = [{ to: { teamName: 'brickma' }, from: { teamName: 'steadman' }, timeRemaining: 45 }]
      const props = { match, activeUser, inactiveUser, challenges };
      wrapper = shallow(<UserPage {...props} />, { disableLifecycleMethods: true });
    })

    it('does not render the page owner\'s cash value', () => {
      expect(wrapper.find('#user-cash').length).to.equal(0);
    })

    it('does not render a buy pack button', () => {
      expect(wrapper.find('#buy-pack-button').length).to.equal(0);
    })

    it('does not render a low cash warning', () => {
      expect(wrapper.find('p #user-page-not-enough-money-warning').length).to.equal(0);
    })

    it('does not render the page owner\'s challenges', () => {
      expect(wrapper.find(NewChallenge).length).to.equal(0);
    })
  })
})