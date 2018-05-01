import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Challenges } from '../components/Challenges';

describe('<Challenges />', () => {
  const challenges = [{teamName: 'ari'}, {teamName: 'jesse'}]
  const props = {challenges};
  let wrapper;
  before(() => {
    wrapper = shallow(<Challenges {...props} />);
  })

  it('renders a div', () => {
    expect(wrapper.is('div')).to.equal(true);
  })

  it('renders a header', () => {
    expect(wrapper.find('h3').text()).to.equal('These are my challenges');
  })

  it('renders the appropriate number of challenges', () => {
    expect(wrapper.find('.challenge').length).to.equal(2);
  })

  it('renders challenges in appropriate order', () => {
    const chals = wrapper.find('.challenge');
    const names = [];
    chals.forEach(chal => names.push(chal.text()))
    expect(names[0]).to.equal('ari')
  })
})