import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { updateGameState } from '../../store';

class BoardButtons extends React.Component {

  componentDidUpdate() {
    if (this.props.gameState.outs === 3) {
      this.props.handleNextInning();
    }
  }
  render() {
    const { half, roll, control, onBase, totalPAs, result, outs, pitcher, batter, turn, printResult, awayTeam, isGameOver } = this.props.gameState;
    const { homeRotation, awayRotation, userTeamName, handleNextInning, pitchAndSwing, handleRoll, homeTeam } = this.props;

    return (
      <div id='board-buttons'>
        {
          outs < 3 &&
          <div>
            {
              !isGameOver && (homeRotation.length && awayRotation.length) && ((half === 'top' && homeTeam === userTeamName) || (half === 'bottom' && awayTeam === userTeamName)) && (result.length > 0 || totalPAs === 0) && <button className="play-button" onClick={() => handleRoll(roll, control, onBase, totalPAs)}>Roll for turn</button>
            }
            {
              ((half === 'top' && homeTeam === userTeamName && turn === 'pitcher') ||
                (half === 'bottom' && awayTeam === userTeamName && turn === 'pitcher')) && 
              (result.length === 0 && totalPAs !== 0) && <button className="play-button" onClick={pitchAndSwing}>Pitch</button>
            }
            {
              ((half === 'top' && awayTeam === userTeamName && turn === 'batter') ||
              (half === 'bottom' && homeTeam === userTeamName && turn === 'batter')) &&
              (result.length === 0 && totalPAs !== 0) && <button className="play-button" onClick={pitchAndSwing}>Swing</button>
            }
            <button id="show-rules-button" onClick={() => store.dispatch(updateGameState({ displayRules: true }))}>Rules</button>
            <h4>Pitcher Control: {pitcher && pitcher.control}</h4>
            <h4>Batter On-Base: {batter && batter.onBase}</h4>
            {
              roll && <h4>Roll: {roll}</h4>
            }
            {
              turn && <h4>Advantage: {turn}</h4>
            }
          </div>
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    gameState: state.play,
    userTeamName: state.user.activeUser.userInfo.teamName,
    homeTeam: state.gameSetUp.homeTeam,
    awayRotation: state.gameSetUp.awayRotation,
    homeRotation: state.gameSetUp.homeRotation,
  }
}

export default withRouter(connect(mapState)(BoardButtons));
