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