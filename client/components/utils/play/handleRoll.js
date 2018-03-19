// export default function handleRoll(roll, control, onBase, totalPAs) {
//   let count = 6;

//   const int = setInterval(() => {
//     console.log('rolled')
//     count--;
//     if (count > 0) {
//       let roll = Math.ceil(Math.random() * 20);
//       return { roll };
//     }
//   }, 100)

//   setTimeout(() => {
//     clearInterval(int);
//     if (roll + control > onBase) {
//       return {
//         turn: 'pitcher',
//         roll,
//         result: '',
//         totalPAs: totalPAs + 1
//       }
//     } else {
//       return {
//         turn: 'batter',
//         roll,
//         result: '',
//         totalPAs: totalPAs + 1
//       }
//     }
//   }, 650)
// }

export function rollDice() {
  let count = 6;
  if (count > 0) {
    count--;
    let roll = Math.ceil(Math.random() * 20);
    this.setState({ roll });
  }
}

export function setTurn(roll, control, onBase, totalPAs) {
  if (roll + control > onBase) {
    this.setState({
      turn: 'pitcher',
      roll,
      result: '',
      totalPAs: totalPAs + 1
    })
  } else {
    this.setState({
      turn: 'batter',
      roll,
      result: '',
      totalPAs: totalPAs + 1
    })
  }
}