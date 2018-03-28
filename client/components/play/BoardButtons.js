import React from 'react';

class BoardButtons extends React.Component {

  componentDidUpdate() {
    if (this.props.outs === 3) {
      this.props.handleNextInning();
    }
  }
  render() {
    const { half, userTeamName, roll, control, onBase, totalPAs, result, outs, pitcher, batter, turn, printResult, handleNextInning, pitchAndSwing, handleRoll, awayTeam, homeTeam, homeRotation, awayRotation, isGameOver } = this.props;
    return (
      <div id='board-buttons'>
        {
          outs < 3 &&
            <div>
              {
                !isGameOver && (homeRotation.length && awayRotation.length) && ((half === 'top' && homeTeam === userTeamName) || (half === 'bottom' && awayTeam === userTeamName)) && (result.length > 0 || totalPAs === 0) && <button onClick={() => handleRoll(roll, control, onBase, totalPAs)}>Roll for turn</button>
              }
              {
               ((half === 'top' && homeTeam === userTeamName && turn === 'pitcher') ||
                (half === 'top' && awayTeam === userTeamName && turn === 'batter') ||
                (half === 'bottom' && awayTeam === userTeamName && turn === 'pitcher') ||
                (half === 'bottom' && homeTeam === userTeamName && turn === 'batter')) &&
                (result.length === 0 && totalPAs !== 0) && <button onClick={pitchAndSwing}>Pitch</button>
              }
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

export default BoardButtons;
