import React from 'react';
import { PlayerAttributes, DisplaySubs } from './index';

const Diamond = props => {
  const {
    display,
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
    third,
    awayTeam,
    homeTeam,
    userTeamName,
    half,
    currentOrder
  } = props;

  return (
    <div id='diamond'>
      {
        displayBench && <DisplaySubs isBench={true} display={display} />
      }
      {
        displayBullpen && <DisplaySubs isBench={false} display={display} />
      }
      {
        (result || outs === 3) && <h4 id='result'>{printResult}</h4>
      }
      <div id='home'>
        {
          ((half === 'top' && awayTeam === userTeamName) || (half === 'bottom' && homeTeam === userTeamName)) &&
          !displayBench && <button id='see-bench' onClick={() => display('displayBench', true)}>See bench</button>
        }
        <div id="home-hover-container">
          {
            batterAttributes
              ?
              [
                <button id='see-batter-card' key={1} onClick={() => display('batterAttributes', false)}>See card</button>,
                <PlayerAttributes key={3} batter={batter} />
              ]
              :
              [
                <button id='see-batter-card' key={1} onClick={() => display('batterAttributes', true)}>See attributes</button>,
                <img src={batter && batter.image} id='home-image' className="diamond-card" key={3} />
              ]
          }
        </div>
      </div>
      <div id='mound'>
        {
          ((half === 'top' && homeTeam === userTeamName) || (half === 'bottom' && awayTeam === userTeamName)) &&
          !displayBullpen && <button id='see-pen' onClick={() => display('displayBullpen', true)}>See bullpen</button>
        }
        <div id="mound-hover-container">
          {
            pitcherAttributes
              ?
              [
                <button id='see-pitcher-card' key={1} onClick={() => display('pitcherAttributes', false)}>See card</button>,
                <PlayerAttributes key={3} pitcher={pitcher} />
              ]
              :
              [
                <button id='see-pitcher-card' key={1} onClick={() => display('pitcherAttributes', true)}>See attributes</button>,
                <img src={pitcher && pitcher.image} id='mound-image' className="diamond-card" key={3} />
              ]
          }
        </div>
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