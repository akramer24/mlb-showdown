import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { rollDice, setTurn, pitchAndSwing, translateResult } from './utils/play';

class Play extends Component {

  constructor() {
    super();
    this.state = {
      turn: '',
      roll: null,
      result: '',
      printResult: '',
      totalPAs: 0,
      half: 'top',
      inning: 1,
      outs: 0,
      awayOrder: [],
      homeOrder: [],
      currentOrder: [],
      awayPitcher: {},
      homePitcher: {},
      batter: {},
      pitcher: {},
      first: '',
      second: '',
      third: '',
      awayScore: 0,
      homeScore: 0,
      currentScore: 0,
      inningRuns: 0,
      awayHits: 0,
      homeHits: 0,
      currentHits: 0,
      awayTeam: '',
      homeTeam: '',
      batterAttributes: false,
      pitcherAttributes: false,
      awayBench: [],
      homeBench: [],
      bench: [],
      awayBullpen: [],
      homeBullpen: [],
      bullpen: [],
      displayBench: false,
      displayBullpen: false
    }
    this.handleRoll = this.handleRoll.bind(this);
  }

  componentDidMount() {
    const { awayLineup, homeLineup, awayRotation, homeRotation } = this.props;

    this.setState({
      awayOrder: awayLineup.slice(0, 9),
      homeOrder: homeLineup.slice(0, 9),
      currentOrder: awayLineup.slice(0, 9),
      awayPitcher: awayRotation[0],
      homePitcher: homeRotation[0],
      batter: awayLineup[0],
      pitcher: homeRotation[0],
      // awayTeam: awayTeamName,
      // homeTeam: homeTeamName,
      awayBench: awayLineup.slice(9, 12),
      homeBench: homeLineup.slice(9, 12),
      bench: awayLineup.slice(9, 12),
      awayBullpen: awayRotation.slice(1, 5),
      homeBullpen: homeRotation.slice(1, 5),
      bullpen: awayRotation.slice(1, 5)
    })
  }
  
  handleRoll(roll, control, onBase, totalPAs) {
    const int = setInterval(() => {
      rollDice.call(this);
    }, 100);
    setTimeout(() => {
      clearInterval(int);
      setTurn.call(this, roll, control, onBase, totalPAs)
    }, 650)
  }

  handleNextInning() {

  }



  render() {
    const { roll, control, onBase, totalPAs, result, outs } = this.state;
    console.log('result: ', result, 'PA: ', totalPAs, 'roll: ', roll, 'outs: ', outs)
    return (
      <div id='board-buttons'>
        {
          this.state.outs == 3
            ?
            <div>
              <button onClick={this.handleNextInning.bind(this)}>Next inning</button>
            </div>
            :
            <div>
              {
                this.state.result || this.state.totalPAs === 0
                  ?
                  <button onClick={() => this.handleRoll(roll, control, onBase, totalPAs)}>Roll for turn</button>
                  :
                  <button onClick={pitchAndSwing.bind(this)}>Pitch</button>
              }
              <h4>Pitcher Control: {this.state.pitcher.control}</h4>
              <h4>Batter On-Base: {this.state.batter.onBase}</h4>
              <h4>{this.state.printResult}</h4>
              {
                this.state.roll
                  ?
                  <h4>Roll: {this.state.roll}</h4>
                  :
                  null
              }
              {
                this.state.turn
                  ?
                  <h4>Advantage: {this.state.turn}</h4>
                  :
                  null
              }
            </div>
        }
      </div>
    )
  }

}

const mapState = state => {
  return {
    awayLineup: state.gameSetUp.awayLineup,
    homeLineup: state.gameSetUp.homeLineup,
    awayRotation: state.gameSetUp.awayRotation,
    homeRotation: state.gameSetUp.homeRotation
  }
}

export default withRouter(connect(mapState)(Play));