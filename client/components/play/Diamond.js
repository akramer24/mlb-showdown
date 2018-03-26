import React from 'react';
import { PlayerAttributes } from './index';

const Diamond = props => {
  const {
    displayBench,
    bench,
    displayBullpen,
    bullpen,
    result,
    outs,
    printResult,
    displayAttributes,
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
      <div id='home'>
        {
          batterAttributes
            ?
            [
              <button id='see-batter-card' key={1} onClick={() => displayAttributes('batterAttributes', false)}>See card</button>,
              <button id='see-bench' key={2}>See bench</button>,
              <PlayerAttributes key={3} batter={batter} />
            ]
            :
            [
              <button id='see-batter-card' key={1} onClick={() => displayAttributes('batterAttributes', true)}>See attributes</button>,
              <button id='see-bench' key={2}>See bench</button>,
              <img src={batter && batter.image} id='home-image' className="diamond-card" key={3} />
            ]
        }
      </div>
      <div id='mound'>
        {
          pitcherAttributes
            ?
            [
              <button id='see-pitcher-card' key={1} onClick={() => displayAttributes('pitcherAttributes', false)}>See card</button>,
              <button id='see-pen' key={2}>See bullpen</button>,
              <PlayerAttributes key={3} pitcher={pitcher} />
            ]
            :
            [
              <button id='see-pitcher-card' key={1} onClick={() => displayAttributes('pitcherAttributes', true)}>See attributes</button>,
              <button id='see-pen' key={2}>See bullpen</button>,
              <img src={pitcher && pitcher.image} id='mound-image' className="diamond-card" key={3} />
            ]
        }
      </div>
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