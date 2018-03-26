import socket from '../../../socket';
import store, { updateGameState } from '../../../store';
import {translateResult} from './index';

export function pitchAndSwing() {
  const { homeTeam } = this.props.gameState
  // store.dispatch(updateGameState({
  //   turn: '',
  //   roll: '',
  // }));
  socket.emit('update game state', { turn: '', roll: '' }, homeTeam);
  const roll = Math.ceil(Math.random() * 20);
  let roller = {};

  if (this.props.gameState.turn == 'pitcher') {
    roller = this.props.gameState.pitcher;
  } else {
    roller = this.props.gameState.batter;
  }

  const outs = ['PU', 'SO', 'GB', 'FB'];
  const notOuts = ['BB', 'single', 'singlePlus', 'double', 'triple', 'homeRun'];
  let order = [];

  const prevBatter = this.props.gameState.currentOrder.slice(0, 1);
  const newOrder = this.props.gameState.currentOrder.slice(1).concat(prevBatter)

  for (let key in roller) {
    let eachRollState = {
      printResult: translateResult.call(this, key),
      result: key,
      batter: this.props.gameState.currentOrder[1],
      currentOrder: newOrder
    }
    // store.dispatch(updateGameState(eachRollState));
    socket.emit('update game state', eachRollState, homeTeam);

    if (outs.includes(key) && roller[key] !== null && roller[key].includes(roll)) {
      console.log(this.props.gameState.batter.name + 'out: ', key)
      // store.dispatch(updateGameState({
      //   outs: this.props.gameState.outs + 1
      // }));
      socket.emit('update game state', {
        outs: this.props.gameState.outs + 1
      }, homeTeam)
      return;
    } else if (notOuts.includes(key) && roller[key] !== null && roller[key].includes(roll)) {
      if (key !== 'BB') {
        let newState = { currentHits: this.props.gameState.currentHits + 1 }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
      }

      if (key == 'BB' && !this.props.gameState.first && !this.props.gameState.second && !this.props.gameState.third) {
        //bases empty walk
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          first: this.props.gameState.batter,
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if (key == 'BB' && this.props.gameState.first && !this.props.gameState.second && !this.props.gameState.third) {
        //man on first walk
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          second: this.props.gameState.first,
          first: this.props.gameState.batter,
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if (key == 'BB' && this.props.gameState.first && this.props.gameState.second && !this.props.gameState.third) {
        //men on first and second walk
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: this.props.gameState.first,
          first: this.props.gameState.batter,
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if (key == 'BB' && this.props.gameState.first && this.props.gameState.second && this.props.gameState.third) {
        //bases loaded walk
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: this.props.gameState.first,
          first: this.props.gameState.batter,
          currentScore: this.props.gameState.currentScore + 1,
          inningRuns: this.props.gameState.inningRuns + 1
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if (key == 'BB' && !this.props.gameState.first && this.props.gameState.second && this.props.gameState.third) {
        //men on second and third walk
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          first: this.props.gameState.batter,
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if (key == 'BB' && !this.props.gameState.first && this.props.gameState.second && !this.props.gameState.third) {
        //man on second walk
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          first: this.props.gameState.batter,
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if (key == 'BB' && !this.props.gameState.first && !this.props.gameState.second && this.props.gameState.third) {
        //man on third walk
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          first: this.props.gameState.batter,
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if (key == 'BB' && this.props.gameState.first && !this.props.gameState.second && this.props.gameState.third) {
        //men on first and third walk
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          second: this.props.gameState.first,
          first: this.props.gameState.batter,
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if (key == 'single' && !this.props.gameState.first && !this.props.gameState.second && !this.props.gameState.third) {
        //bases empty single
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          first: this.props.gameState.batter,
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if ((key == 'single' || key == 'singlePlus') && this.props.gameState.first && !this.props.gameState.second && !this.props.gameState.third) {
        //man on first single
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          second: this.props.gameState.first,
          first: this.props.gameState.batter,
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if (key == 'single' && !this.props.gameState.first && this.props.gameState.second && !this.props.gameState.third) {
        //man on second single
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: '',
          first: this.props.gameState.batter,
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if (key == 'single' && !this.props.gameState.first && !this.props.gameState.second && this.props.gameState.third) {
        //man on third single
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: '',
          first: this.props.gameState.batter,
          currentScore: this.props.gameState.currentScore + 1,
          inningRuns: this.props.gameState.inningRuns + 1
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if ((key == 'single' || key == 'singlePlus') && this.props.gameState.first && this.props.gameState.second && !this.props.gameState.third) {
        //men on first and second single
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: this.props.gameState.first,
          first: this.props.gameState.batter,
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if ((key == 'single' || key == 'singlePlus') && this.props.gameState.first && !this.props.gameState.second && this.props.gameState.third) {
        //men on first and third single
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: '',
          second: this.props.gameState.first,
          first: this.props.gameState.batter,
          currentScore: this.props.gameState.currentScore + 1,
          inningRuns: this.props.gameState.inningRuns + 1
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if (key == 'single' && !this.props.gameState.first && this.props.gameState.second && this.props.gameState.third) {
        //men on second and third single
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: '',
          first: this.props.gameState.batter,
          currentScore: this.props.gameState.currentScore + 1,
          inningRuns: this.props.gameState.inningRuns + 1
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if ((key == 'single' || key == 'singlePlus') && this.props.gameState.first && this.props.gameState.second && this.props.gameState.third) {
        //bases loaded single
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: this.props.gameState.first,
          first: this.props.gameState.batter,
          currentScore: this.props.gameState.currentScore + 1,
          inningRuns: this.props.gameState.inningRuns + 1
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);
        return;
      } else if (key == 'singlePlus' && !this.props.gameState.first && !this.props.gameState.second && !this.props.gameState.third) {
        //bases empty singlePlus
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300)
        return;
      } else if (key == 'singlePlus' && !this.props.gameState.first && this.props.gameState.second && !this.props.gameState.third) {
        //man on second singlePlus
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);
        return;
      } else if (key == 'singlePlus' && !this.props.gameState.first && !this.props.gameState.second && this.props.gameState.third) {
        //man on third singlePlus
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: '',
            second: this.props.gameState.first,
            first: '',
            currentScore: this.props.gameState.currentScore + 1,
            inningRuns: this.props.gameState.inningRuns + 1
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);
        return;
      } else if (key == 'double' && !this.props.gameState.first && !this.props.gameState.second && !this.props.gameState.third) {
        //bases empty double
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);
        return;
      } else if (key == 'double' && this.props.gameState.first && !this.props.gameState.second && !this.props.gameState.third) {
        //man on first double
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          second: this.props.gameState.first,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: '',
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);
        return;
      } else if (key == 'double' && !this.props.gameState.first && this.props.gameState.second && !this.props.gameState.third) {
        //man on second double
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: '',
            second: this.props.gameState.first,
            first: '',
            currentScore: this.props.gameState.currentScore + 1,
            inningRuns: this.props.gameState.inningRuns + 1
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);
        return;
      } else if (key == 'double' && !this.props.gameState.first && !this.props.gameState.second && this.props.gameState.third) {
        //man on third double
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: '',
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: '',
            second: this.props.gameState.first,
            first: '',
            currentScore: this.props.gameState.currentScore + 1,
            inningRuns: this.props.gameState.inningRuns + 1
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);
        return;
      } else if (key == 'double' && this.props.gameState.first && this.props.gameState.second && !this.props.gameState.third) {
        //men on first and second double
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: this.props.gameState.first,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: '',
            currentScore: this.props.gameState.currentScore + 1,
            inningRuns: this.props.gameState.inningRuns + 1
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);
        return;
      } else if (key == 'double' && this.props.gameState.first && !this.props.gameState.second && this.props.gameState.third) {
        //men on first and third double
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: '',
          second: this.props.gameState.first,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: '',
            currentScore: this.props.gameState.currentScore + 1,
            inningRuns: this.props.gameState.inningRuns + 1
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);
        return;
      } else if (key == 'double' && !this.props.gameState.first && this.props.gameState.second && this.props.gameState.third) {
        //men on second and third double
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: '',
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: '',
            second: this.props.gameState.first,
            first: '',
            currentScore: this.props.gameState.currentScore + 2,
            inningRuns: this.props.gameState.inningRuns + 2
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);
        return;
      } else if (key == 'double' && this.props.gameState.first && this.props.gameState.second && this.props.gameState.third) {
        //bases loaded double
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: this.props.gameState.first,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: '',
            currentScore: this.props.gameState.currentScore + 2,
            inningRuns: this.props.gameState.inningRuns + 2
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);
        return;
      } else if (key == 'triple' && !this.props.gameState.first && !this.props.gameState.second && !this.props.gameState.third) {
        //bases empty triple
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            second: this.props.gameState.first,
            first: '',
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam)
        }, 600);
        return;
      } else if (key == 'triple' && this.props.gameState.first && !this.props.gameState.second && !this.props.gameState.third) {
        //man on first triple
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          second: this.props.gameState.first,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: '',
            currentScore: this.props.gameState.currentScore + 1,
            inningRuns: this.props.gameState.inningRuns + 1
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);
        return;
      } else if (key == 'triple' && !this.props.gameState.first && this.props.gameState.second && !this.props.gameState.third) {
        //man on second triple
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: '',
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: '',
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: '',
            currentScore: this.props.gameState.currentScore + 1,
            inningRuns: this.props.gameState.inningRuns + 1
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);
        return;
      } else if (key == 'triple' && !this.props.gameState.first && !this.props.gameState.second && this.props.gameState.third) {
        //man on third triple
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: '',
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            currentScore: this.props.gameState.currentScore + 1,
            inningRuns: this.props.gameState.inningRuns + 1
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);
        return;
      } else if (key == 'triple' && this.props.gameState.first && this.props.gameState.second && !this.props.gameState.third) {
        //men on first and second triple
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: this.props.gameState.first,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: '',
            currentScore: this.props.gameState.currentScore + 2,
            inningRuns: this.props.gameState.inningRuns + 2
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);
        return;
      } else if (key == 'triple' && this.props.gameState.first && !this.props.gameState.second && this.props.gameState.third) {
        //men on first and third triple
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: '',
          second: this.props.gameState.first,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            currentScore: this.props.gameState.currentScore + 2,
            inningRuns: this.props.gameState.inningRuns + 2
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);
        return;
      } else if (key == 'triple' && !this.props.gameState.first && this.props.gameState.second && this.props.gameState.third) {
        //men on second and third triple
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: '',
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: '',
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: '',
            currentScore: this.props.gameState.currentScore + 2,
            inningRuns: this.props.gameState.inningRuns + 2
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);
        return;
      } else if (key == 'triple' && this.props.gameState.first && this.props.gameState.second && this.props.gameState.third) {
        //bases loaded triple
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: this.props.gameState.first,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: '',
            currentScore: this.props.gameState.currentScore + 3,
            inningRuns: this.props.gameState.inningRuns + 3
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);
        return;
      } else if (key == 'homeRun' && !this.props.gameState.first && !this.props.gameState.second && !this.props.gameState.third) {
        //bases empty homeRun
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);

        setTimeout(() => {
          let newState = {
            third: '',
            currentScore: this.props.gameState.currentScore + 1,
            inningRuns: this.props.gameState.inningRuns + 1
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 900);
        return;
      } else if (key == 'homeRun' && this.props.gameState.first && !this.props.gameState.second && !this.props.gameState.third) {
        //man on first homeRun
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          second: this.props.gameState.first,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);

        setTimeout(() => {
          let newState = {
            third: '',
            currentScore: this.props.gameState.currentScore + 2,
            inningRuns: this.props.gameState.inningRuns + 2
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 900);
        return;
      } else if (key == 'homeRun' && !this.props.gameState.first && this.props.gameState.second && !this.props.gameState.third) {
        //man on second homeRun
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: '',
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: '',
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);

        setTimeout(() => {
          let newState = {
            third: '',
            currentScore: this.props.gameState.currentScore + 2,
            inningRuns: this.props.gameState.inningRuns + 2
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 900);
        return;
      } else if (key == 'homeRun' && !this.props.gameState.first && !this.props.gameState.second && this.props.gameState.third) {
        //man on third homeRun
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: '',
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);

        setTimeout(() => {
          let newState = {
            third: '',
            currentScore: this.props.gameState.currentScore + 2,
            inningRuns: this.props.gameState.inningRuns + 2
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 900);
        return;
      } else if (key == 'homeRun' && this.props.gameState.first && this.props.gameState.second && !this.props.gameState.third) {
        //men on first and second homeRun
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: this.props.gameState.first,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);

        setTimeout(() => {
          let newState = {
            third: '',
            currentScore: this.props.gameState.currentScore + 3,
            inningRuns: this.props.gameState.inningRuns + 3
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 900);
        return;
      } else if (key == 'homeRun' && this.props.gameState.first && !this.props.gameState.second && this.props.gameState.third) {
        //men on first and third homeRun
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: '',
          second: this.props.gameState.first,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);

        setTimeout(() => {
          let newState = {
            third: '',
            currentScore: this.props.gameState.currentScore + 3,
            inningRuns: this.props.gameState.inningRuns + 3
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 900);
        return;
      } else if (key == 'homeRun' && !this.props.gameState.first && this.props.gameState.second && this.props.gameState.third) {
        //men on second and third homeRun
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: '',
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: '',
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);

        setTimeout(() => {
          let newState = {
            third: '',
            currentScore: this.props.gameState.currentScore + 3,
            inningRuns: this.props.gameState.inningRuns + 3
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 900);
        return;
      } else if (key == 'homeRun' && this.props.gameState.first && this.props.gameState.second && this.props.gameState.third) {
        //bases loaded homeRun
        console.log(this.props.gameState.batter.name + 'reached by: ', key)
        let newState = {
          third: this.props.gameState.second,
          second: this.props.gameState.first,
          first: this.props.gameState.batter
        }
        // store.dispatch(updateGameState(newState));
        socket.emit('update game state', newState, homeTeam);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: this.props.gameState.first,
            first: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 300);

        setTimeout(() => {
          let newState = {
            third: this.props.gameState.second,
            second: ''
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 600);

        setTimeout(() => {
          let newState = {
            third: '',
            currentScore: this.props.gameState.currentScore + 4,
            inningRuns: this.props.gameState.inningRuns + 4
          }
          // store.dispatch(updateGameState(newState));
          socket.emit('update game state', newState, homeTeam);
        }, 900);
        return;
      }
    }
  }
}