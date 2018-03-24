import React from 'react';

const Diamond = props => {
  const {
    displayBench,
    bench,
    displayBullpen,
    bullpen,
    result,
    outs,
    printResult,
    batterAttributes,
    batter,
    pitcherAttributes,
    pitcher,
    first,
    second,
    third
  } = props;

  return (
    <div id='diamond'>
      {
        displayBench && <div className='sub'>
          <h3>Bench <button className='sub-button'>Hide Bench</button></h3>
          {bench.map(player => {
            return <li key={player.id}>{player.name}, {player.position}
              <button className='sub-button'>Insert</button>
            </li>
          })}
        </div>
      }
      {
        displayBullpen && <div className='sub'>
          <h3>Bullpen <button className='sub-button'>Hide Bullpen</button></h3>
          {bullpen.map(player => {
            return <li key={player.id}>{player.name}, {player.position}
              <button onClick={this.subPitcher.bind(this, player)} className='sub-button'>Insert</button>
            </li>
          })}
        </div>
      }
      {
        (result || outs == 3) && <h4 id='result'>{printResult}</h4>
      }
      {
        batterAttributes
          ?
          <div id='home'>
            <button id='see-batter-card'>See card</button>
            <button id='see-bench'>See bench</button>
            <PlayerAttributes batter={batter} />
          </div>
          :
          <div id='home'>
            <button id='see-batter-card'>See attributes</button>
            <button id='see-bench'>See bench</button>
            <img src={batter.image} id='home-image' className="diamond-card" />
          </div>
      }
      {
        pitcherAttributes
          ?
          <div id='mound'>
            <button id='see-pitcher-card'>See card</button>
            <button id='see-pen'>See bullpen</button>
            <PlayerAttributes pitcher={pitcher} />
          </div>
          :
          <div id='mound'>
            <button id='see-pitcher-card'>See attributes</button>
            <button id='see-pen'>See bullpen</button>
            <img src={pitcher.image} id='mound-image' className="diamond-card" />
          </div>
      }
      <div id='first-basepath' className="basepath"></div>
      <div id='first' className="basepath">
        <div id='first-base' className='base'></div>
        {
          first && <img src={first.image} id='first-image' className="diamond-card" />
        }
      </div>
      <div id='right-deep-INF' className="basepath"></div>
      <div id='right-basepath' className="basepath"></div>
      <div id='second' className="basepath">
        <div id='second-base' className='base'></div>
        {
          second && <img src={second.image} id='second-image' className="diamond-card" />
        }
      </div>
      <div id='left-deep-INF' className="basepath"></div>
      <div id='left-basepath' className="basepath"></div>
      <div id='third' className="basepath">
        <div id='third-base' className='base'></div>
        {
          third && <img src={third.image} id='third-image' className="diamond-card" />
        }
      </div>
      <div id='third-basepath' className="basepath"></div>
    </div>
  )
}

export default Diamond;