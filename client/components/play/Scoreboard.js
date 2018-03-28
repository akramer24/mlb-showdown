import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Scoreboard extends Component {

  constructor() {
    super();
    this.state = {
      top1: 0,
      bottom1: 0,
      top2: 0,
      bottom2: 0,
      top3: 0,
      bottom3: 0,
      top4: 0,
      bottom4: 0,
      top5: 0,
      bottom5: 0,
      top6: 0,
      bottom6: 0,
      top7: 0,
      bottom7: 0,
      top8: 0,
      bottom8: 0,
      top9: 0,
      bottom9: 0,
      top10: 0,
      bottom10: 0,
      top11: 0,
      bottom11: 0,
      top12: 0,
      bottom12: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const { half, inning, inningRuns } = nextProps.gameState;
    this.setState({ [half + inning]: inningRuns })
  }

  handleAwayInning(inn) {
    let stateInn = `top${inn}`;

    if (this.props.gameState.inning >= inn) {
      return this.state[stateInn];
    }
  }

  handleHomeInning(inn) {
    let stateInn = `bottom${inn}`;
    const { half, inning } = this.props.gameState;

    if ((half == 'bottom' && inning === inn) || inning > inn) {
      return this.state[stateInn];
    }
  }

  render() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    const { awayTeam, homeTeam, half, inning, awayScore, homeScore, currentScore, inningRuns, outs, awayHits, homeHits, currentHits } = this.props.gameState;
    return (
      <div id="scoreboard">
        <table id='full-scoreboard'>
          <tbody>
            <tr id='names-row'>
              <th className='score-name-value'>Team</th>
              <th className='score-value'>1</th>
              <th className='score-value'>2</th>
              <th className='score-value'>3</th>
              <th className='score-value'>4</th>
              <th className='score-value'>5</th>
              <th className='score-value'>6</th>
              <th className='score-value'>7</th>
              <th className='score-value'>8</th>
              <th className='score-value'>9</th>
              <th className='score-value'>10</th>
              <th className='score-value'>11</th>
              <th className='score-value'>12</th>
              <th className='score-value'>R</th>
              <th className='score-value'>H</th>
              <th className='score-value'>E</th>
            </tr>
            <tr id='away-row'>
              {
                arr.map(ele => {
                  if (ele === 1) {
                    return (
                      <td key={ele} className='score-name-value'>{awayTeam.slice(0, 11)}</td>
                    )
                  } else if (ele === 14) {
                    return (
                      <td key={ele} className='score-value'>{
                        half == 'top'
                          ?
                          currentScore
                          :
                          awayScore
                      }</td>
                    )
                  } else if (ele === 15) {
                    return (
                      <td key={ele} className='score-value'>
                        {
                          half == 'top'
                            ?
                            currentHits
                            :
                            awayHits
                        }
                      </td>
                    )
                  } else if (ele === 16) {
                    return (
                      <td key={ele} className='score-value'>0</td>
                    )
                  } else {
                    return (
                      <td key={ele} className='score-value' id={`away-${ele - 1}`}>
                        {
                          this.handleAwayInning.call(this, (ele - 1))
                        }
                      </td>
                    )
                  }

                })
              }
            </tr>
            <tr id='home-row'>
              {
                arr.map(ele => {
                  if (ele === 1) {
                    return (
                      <td key={ele} className='score-name-value'>{homeTeam.slice(0, 11)}</td>
                    )
                  } else if (ele === 14) {
                    return (
                      <td key={ele} className='score-value'>{
                        half == 'bottom'
                          ?
                          currentScore
                          :
                          homeScore
                      }</td>
                    )
                  } else if (ele === 15) {
                    return (
                      <td key={ele} className='score-value'>
                        {
                          half == 'bottom'
                            ?
                            currentHits
                            :
                            homeHits
                        }
                      </td>
                    )
                  } else if (ele === 16) {
                    return (
                      <td key={ele} className='score-value'>0</td>
                    )
                  } else {
                    return (
                      <td key={ele} className='score-value' id={`home-${ele - 1}`}>
                        {
                          this.handleHomeInning.call(this, (ele - 1))
                        }
                      </td>
                    )
                  }

                })
              }
            </tr>
            <tr className='scoreboard-stuff'>
              {
                half === 'top'
                  ?
                  <td className='score-name-value'>
                    <span className="half-caret">&#9650;</span>{inning} Outs: {outs}
                  </td>
                  :
                  <td className='score-name-value'>
                    <span className="half-caret">&#9660;</span>{inning} Outs: {outs}
                  </td>
              }
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    gameState: state.play
  }
}

export default withRouter(connect(mapState)(Scoreboard));