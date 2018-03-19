import React from 'react';

const Lineup = props => {
  const { half, awayTeam, homeTeam, currentOrder } = props;
  return (
    <div id='ingame-lineup'>
      {
        half == 'top'
          ?
          <h3>{awayTeam}</h3>
          :
          <h3>{homeTeam}</h3>
      }
      {
        currentOrder.map((batter, idx) => {
          if (idx === 0) {
            return <h4 key={batter.id}><span className='lineup-prefix'>At Bat: </span>{batter.name}</h4>
          } else if (idx === 1) {
            return <h4 key={batter.id}><span className='lineup-prefix'>On Deck: </span>{batter.name}</h4>
          } else {
            return <h4 key={batter.id}>{batter.name}</h4>
          }
        })
      }
    </div>
  )
}

export default Lineup;