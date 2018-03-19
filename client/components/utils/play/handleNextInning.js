export function handleNextInning() {
  const newInning = this.state.inning + 1;

  if (this.state.half == 'top') {
    this.setState({
      awayOrder: this.state.currentOrder,
      result: '',
      totalPAs: 0,
      half: 'bottom',
      outs: 0,
      first: '',
      second: '',
      third: '',
      currentOrder: this.state.homeOrder,
      batter: this.state.homeOrder[0],
      pitcher: this.state.awayPitcher,
      awayScore: this.state.currentScore,
      currentScore: this.state.homeScore,
      awayHits: this.state.currentHits,
      currentHits: this.state.homeHits,
      bench: this.state.homeBench,
      bullpen: this.state.homeBullpen,
      inningRuns: 0
    })
  } else if (this.state.half == 'bottom') {
    this.setState({
      homeOrder: this.state.currentOrder,
      half: 'top',
      result: '',
      totalPAs: 0,
      outs: 0,
      inning: newInning,
      first: '',
      second: '',
      third: '',
      currentOrder: this.state.awayOrder,
      batter: this.state.awayOrder[0],
      pitcher: this.state.homePitcher,
      homeScore: this.state.currentScore,
      currentScore: this.state.awayScore,
      homeHits: this.state.currentHits,
      currentHits: this.state.awayHits,
      bench: this.state.awayBench,
      bullpen: this.state.awayBullpen,
      inningRuns: 0
    })
  }
}