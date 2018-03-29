import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { updateGameState } from '../../store';

class Rules extends React.Component {

  handleClickOutside() {
    store.dispatch(updateGameState({ displayRules: false }));
  }

  render() {
    return (
      <div id="rules" className="animated fadeIn">
        <h3 id="rules-header">How to play</h3>
        <p>1. The defense rolls for the turn.</p>
        <p>2. If the pitcher's control plus the roll is greater than the batter's on-base percentage,
        then the pitcher rolls again for the pitch. The outcome of this roll gets matched with the pitcher's
        corresponding attribute to determine the result. Otherwise, the batter rolls and his attributes are used.</p>
        <p>3. You can roll and pitch by clicking the respective buttons, or you can press "r" and "p" on your keyboard.</p>
        <button id="rules-got-it" onClick={() => this.handleClickOutside()}>Got it!</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    displayRules: state.play.displayRules
  }
}

export default withRouter(connect(mapState)(onClickOutside(Rules)));
