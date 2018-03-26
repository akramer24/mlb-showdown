import React, { Component } from 'react';

export default class PlayerAttributes extends Component {

  constructor() {
    super();
    this.convertArray = this.convertArray.bind(this);
  }

  convertArray(arr) {
    if (!arr) {
      return '-';
    } else if (arr.length === 1) {
      return arr.join('');
    } else {
      return arr[0] + '-' + arr[arr.length - 1];
    }
  }

  render() {
    const player = this.props.batter ? this.props.batter : this.props.pitcher;
    const id = this.props.batter ? 'batter' : 'pitcher';

    return (
      <div id={`${id}-game-attributes`} className="player-game-attributes">
        {
          this.props.batter
            ?
            [
              <div key={1} id="player-game-attributes-column-container">
                <div className="player-game-attributes-column">
                  <p>K: <span className="player-game-attributes-number">{this.convertArray(player.SO)}</span></p>
                  <p>GB: <span className="player-game-attributes-number">{this.convertArray(player.GB)}</span></p>
                  <p>FO: <span className="player-game-attributes-number">{this.convertArray(player.FB)}</span></p>
                  <p>BB: <span className="player-game-attributes-number">{this.convertArray(player.BB)}</span></p>
                </div>
                <div className="player-game-attributes-column">
                  <p>1B: <span className="player-game-attributes-number">{this.convertArray(player.single)}</span></p>
                  <p>1B+: <span className="player-game-attributes-number">{this.convertArray(player.singlePlus)}</span></p>
                  <p>2B: <span className="player-game-attributes-number">{this.convertArray(player.double)}</span></p>
                  <p>3B: <span className="player-game-attributes-number">{this.convertArray(player.triple)}</span></p>
                </div>
              </div>,
              <p id="player-game-attributes-hr" key={2}>HR: <span className="player-game-attributes-number">{this.convertArray(player.homeRun)}</span></p>
            ]
            :
            <div id="player-game-attributes-column-container">
              <div className="player-game-attributes-column">
                <p>PO: <span className="player-game-attributes-number">{this.convertArray(player.PU)}</span></p>
                <p>K: <span className="player-game-attributes-number">{this.convertArray(player.SO)}</span></p>
                <p>GB: <span className="player-game-attributes-number">{this.convertArray(player.GB)}</span></p>
                <p>FO: <span className="player-game-attributes-number">{this.convertArray(player.FB)}</span></p>
              </div>
              <div className="player-game-attributes-column">
                <p>BB: <span className="player-game-attributes-number">{this.convertArray(player.BB)}</span></p>
                <p>1B: <span className="player-game-attributes-number">{this.convertArray(player.single)}</span></p>
                <p>2B: <span className="player-game-attributes-number">{this.convertArray(player.double)}</span></p>
                <p>HR: <span className="player-game-attributes-number">{this.convertArray(player.homeRun)}</span></p>
              </div>
            </div>
        }
      </div>
    )
  }
}