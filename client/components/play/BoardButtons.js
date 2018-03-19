import React from 'react';

const BoardButtons = props => {

  const { roll, control, onBase, totalPAs, result, outs, pitcher, batter, turn, printResult, handleNextInning, pitchAndSwing, handleRoll } = props;

  return (
    <div id='board-buttons'>
      {
        outs === 3
          ?
          <div>
            <button onClick={handleNextInning}>Next inning</button>
          </div>
          :
          <div>
            {
              result || totalPAs === 0
                ?
                <button onClick={() => handleRoll(roll, control, onBase, totalPAs)}>Roll for turn</button>
                :
                <button onClick={pitchAndSwing}>Pitch</button>
            }
            <h4>Pitcher Control: {pitcher.control}</h4>
            <h4>Batter On-Base: {batter.onBase}</h4>
            <h4>{printResult}</h4>
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

export default BoardButtons;