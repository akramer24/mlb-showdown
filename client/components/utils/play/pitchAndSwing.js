import {translateResult} from './index';

export function pitchAndSwing() {
  this.setState({
    turn: '',
    roll: '',
  });
  const roll = Math.ceil(Math.random() * 20);
  let roller = {};

  if (this.state.turn == 'pitcher') {
    roller = this.state.pitcher;
  } else {
    roller = this.state.batter;
  }

  const outs = ['PU', 'SO', 'GB', 'FB'];
  const notOuts = ['BB', 'single', 'singlePlus', 'double', 'triple', 'homeRun'];
  let order = [];

  const prevBatter = this.state.currentOrder.slice(0, 1);
  const newOrder = this.state.currentOrder.slice(1).concat(prevBatter)

  for (let key in roller) {
    this.setState({
      printResult: translateResult.call(this, key),
      result: key,
      batter: this.state.currentOrder[1],
      currentOrder: newOrder
    })

    if (outs.includes(key) && roller[key] !== null && roller[key].includes(roll)) {
      console.log(this.state.batter.name + 'out: ', key)
      this.setState({
        outs: this.state.outs + 1
      });
      return;
    } else if (notOuts.includes(key) && roller[key] !== null && roller[key].includes(roll)) {
      if (key !== 'BB') {
        this.setState({ currentHits: this.state.currentHits + 1 })
      }

      if (key == 'BB' && !this.state.first && !this.state.second && !this.state.third) {
        //bases empty walk
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          first: this.state.batter,
        });
        return;
      } else if (key == 'BB' && this.state.first && !this.state.second && !this.state.third) {
        //man on first walk
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          second: this.state.first,
          first: this.state.batter,
        });
        return;
      } else if (key == 'BB' && this.state.first && this.state.second && !this.state.third) {
        //men on first and second walk
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: this.state.first,
          first: this.state.batter,
        });
        return;
      } else if (key == 'BB' && this.state.first && this.state.second && this.state.third) {
        //bases loaded walk
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: this.state.first,
          first: this.state.batter,
          currentScore: this.state.currentScore + 1,
          inningRuns: this.state.inningRuns + 1
        });
        return;
      } else if (key == 'BB' && !this.state.first && this.state.second && this.state.third) {
        //men on second and third walk
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          first: this.state.batter,
        });
        return;
      } else if (key == 'BB' && !this.state.first && this.state.second && !this.state.third) {
        //man on second walk
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          first: this.state.batter,
        });
        return;
      } else if (key == 'BB' && !this.state.first && !this.state.second && this.state.third) {
        //man on third walk
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          first: this.state.batter,
        });
        return;
      } else if (key == 'BB' && this.state.first && !this.state.second && this.state.third) {
        //men on first and third walk
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          second: this.state.first,
          first: this.state.batter,
        });
        return;
      } else if (key == 'single' && !this.state.first && !this.state.second && !this.state.third) {
        //bases empty single
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          first: this.state.batter,
        });
        return;
      } else if ((key == 'single' || key == 'singlePlus') && this.state.first && !this.state.second && !this.state.third) {
        //man on first single
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          second: this.state.first,
          first: this.state.batter,
        });
        return;
      } else if (key == 'single' && !this.state.first && this.state.second && !this.state.third) {
        //man on second single
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: '',
          first: this.state.batter,
        });
        return;
      } else if (key == 'single' && !this.state.first && !this.state.second && this.state.third) {
        //man on third single
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: '',
          first: this.state.batter,
          currentScore: this.state.currentScore + 1,
          inningRuns: this.state.inningRuns + 1
        });
        return;
      } else if ((key == 'single' || key == 'singlePlus') && this.state.first && this.state.second && !this.state.third) {
        //men on first and second single
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: this.state.first,
          first: this.state.batter,
        });
        return;
      } else if ((key == 'single' || key == 'singlePlus') && this.state.first && !this.state.second && this.state.third) {
        //men on first and third single
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: '',
          second: this.state.first,
          first: this.state.batter,
          currentScore: this.state.currentScore + 1,
          inningRuns: this.state.inningRuns + 1
        });
        return;
      } else if (key == 'single' && !this.state.first && this.state.second && this.state.third) {
        //men on second and third single
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: '',
          first: this.state.batter,
          currentScore: this.state.currentScore + 1,
          inningRuns: this.state.inningRuns + 1
        });
        return;
      } else if ((key == 'single' || key == 'singlePlus') && this.state.first && this.state.second && this.state.third) {
        //bases loaded single
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: this.state.first,
          first: this.state.batter,
          currentScore: this.state.currentScore + 1,
          inningRuns: this.state.inningRuns + 1
        });
        return;
      } else if (key == 'singlePlus' && !this.state.first && !this.state.second && !this.state.third) {
        //bases empty singlePlus
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          first: this.state.batter
        });

        setTimeout(() => {
          this.setState({
            second: this.state.first,
            first: ''
          });
        }, 300)
        return;
      } else if (key == 'singlePlus' && !this.state.first && this.state.second && !this.state.third) {
        //man on second singlePlus
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          first: this.state.batter
        });

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: ''
          });
        }, 300);
        return;
      } else if (key == 'singlePlus' && !this.state.first && !this.state.second && this.state.third) {
        //man on third singlePlus
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: '',
            second: this.state.first,
            first: '',
            currentScore: this.state.currentScore + 1,
            inningRuns: this.state.inningRuns + 1
          });
        }, 300);
        return;
      } else if (key == 'double' && !this.state.first && !this.state.second && !this.state.third) {
        //bases empty double
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            second: this.state.first,
            first: ''
          });
        }, 300);
        return;
      } else if (key == 'double' && this.state.first && !this.state.second && !this.state.third) {
        //man on first double
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          second: this.state.first,
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: '',
          });
        }, 300);
        return;
      } else if (key == 'double' && !this.state.first && this.state.second && !this.state.third) {
        //man on second double
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: '',
            second: this.state.first,
            first: '',
            currentScore: this.state.currentScore + 1,
            inningRuns: this.state.inningRuns + 1
          });
        }, 300);
        return;
      } else if (key == 'double' && !this.state.first && !this.state.second && this.state.third) {
        //man on third double
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: '',
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: '',
            second: this.state.first,
            first: '',
            currentScore: this.state.currentScore + 1,
            inningRuns: this.state.inningRuns + 1
          });
        }, 300);
        return;
      } else if (key == 'double' && this.state.first && this.state.second && !this.state.third) {
        //men on first and second double
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: this.state.first,
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: '',
            currentScore: this.state.currentScore + 1,
            inningRuns: this.state.inningRuns + 1
          });
        }, 300);
        return;
      } else if (key == 'double' && this.state.first && !this.state.second && this.state.third) {
        //men on first and third double
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: '',
          second: this.state.first,
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: '',
            currentScore: this.state.currentScore + 1,
            inningRuns: this.state.inningRuns + 1
          });
        }, 300);
        return;
      } else if (key == 'double' && !this.state.first && this.state.second && this.state.third) {
        //men on second and third double
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: '',
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: '',
            second: this.state.first,
            first: '',
            currentScore: this.state.currentScore + 2,
            inningRuns: this.state.inningRuns + 2
          });
        }, 300);
        return;
      } else if (key == 'double' && this.state.first && this.state.second && this.state.third) {
        //bases loaded double
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: this.state.first,
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: '',
            currentScore: this.state.currentScore + 2,
            inningRuns: this.state.inningRuns + 2
          });
        }, 300);
        return;
      } else if (key == 'triple' && !this.state.first && !this.state.second && !this.state.third) {
        //bases empty triple
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            second: this.state.first,
            first: '',
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: ''
          });
        }, 600);
        return;
      } else if (key == 'triple' && this.state.first && !this.state.second && !this.state.third) {
        //man on first triple
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          second: this.state.first,
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: '',
            currentScore: this.state.currentScore + 1,
            inningRuns: this.state.inningRuns + 1
          });
        }, 600);
        return;
      } else if (key == 'triple' && !this.state.first && this.state.second && !this.state.third) {
        //man on second triple
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: '',
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: '',
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: '',
            currentScore: this.state.currentScore + 1,
            inningRuns: this.state.inningRuns + 1
          });
        }, 600);
        return;
      } else if (key == 'triple' && !this.state.first && !this.state.second && this.state.third) {
        //man on third triple
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: '',
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            currentScore: this.state.currentScore + 1,
            inningRuns: this.state.inningRuns + 1
          });
        }, 600);
        return;
      } else if (key == 'triple' && this.state.first && this.state.second && !this.state.third) {
        //men on first and second triple
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: this.state.first,
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: '',
            currentScore: this.state.currentScore + 2,
            inningRuns: this.state.inningRuns + 2
          });
        }, 600);
        return;
      } else if (key == 'triple' && this.state.first && !this.state.second && this.state.third) {
        //men on first and third triple
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: '',
          second: this.state.first,
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            currentScore: this.state.currentScore + 2,
            inningRuns: this.state.inningRuns + 2
          });
        }, 600);
        return;
      } else if (key == 'triple' && !this.state.first && this.state.second && this.state.third) {
        //men on second and third triple
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: '',
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: '',
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: '',
            currentScore: this.state.currentScore + 2,
            inningRuns: this.state.inningRuns + 2
          });
        }, 600);
        return;
      } else if (key == 'triple' && this.state.first && this.state.second && this.state.third) {
        //bases loaded triple
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: this.state.first,
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: '',
            currentScore: this.state.currentScore + 3,
            inningRuns: this.state.inningRuns + 3
          }, 600);
        });
        return;
      } else if (key == 'homeRun' && !this.state.first && !this.state.second && !this.state.third) {
        //bases empty homeRun
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: ''
          })
        }, 600);

        setTimeout(() => {
          this.setState({
            third: '',
            currentScore: this.state.currentScore + 1,
            inningRuns: this.state.inningRuns + 1
          });
        }, 900);
        return;
      } else if (key == 'homeRun' && this.state.first && !this.state.second && !this.state.third) {
        //man on first homeRun
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          second: this.state.first,
          first: this.state.batter
        })
        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: ''
          })
        }, 600);

        setTimeout(() => {
          this.setState({
            third: '',
            currentScore: this.state.currentScore + 2,
            inningRuns: this.state.inningRuns + 2
          });
        }, 900);
        return;
      } else if (key == 'homeRun' && !this.state.first && this.state.second && !this.state.third) {
        //man on second homeRun
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: '',
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: '',
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: ''
          })
        }, 600);

        setTimeout(() => {
          this.setState({
            third: '',
            currentScore: this.state.currentScore + 2,
            inningRuns: this.state.inningRuns + 2
          });
        }, 900);
        return;
      } else if (key == 'homeRun' && !this.state.first && !this.state.second && this.state.third) {
        //man on third homeRun
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: '',
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: ''
          })
        }, 600);

        setTimeout(() => {
          this.setState({
            third: '',
            currentScore: this.state.currentScore + 2,
            inningRuns: this.state.inningRuns + 2
          });
        }, 900);
        return;
      } else if (key == 'homeRun' && this.state.first && this.state.second && !this.state.third) {
        //men on first and second homeRun
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: this.state.first,
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: ''
          })
        }, 600);

        setTimeout(() => {
          this.setState({
            third: '',
            currentScore: this.state.currentScore + 3,
            inningRuns: this.state.inningRuns + 3
          });
        }, 900);
        return;
      } else if (key == 'homeRun' && this.state.first && !this.state.second && this.state.third) {
        //men on first and third homeRun
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: '',
          second: this.state.first,
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: ''
          })
        }, 600);

        setTimeout(() => {
          this.setState({
            third: '',
            currentScore: this.state.currentScore + 3,
            inningRuns: this.state.inningRuns + 3
          });
        }, 900);
        return;
      } else if (key == 'homeRun' && !this.state.first && this.state.second && this.state.third) {
        //men on second and third homeRun
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: '',
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: '',
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: ''
          })
        }, 600);

        setTimeout(() => {
          this.setState({
            third: '',
            currentScore: this.state.currentScore + 3,
            inningRuns: this.state.inningRuns + 3
          });
        }, 900);
        return;
      } else if (key == 'homeRun' && this.state.first && this.state.second && this.state.third) {
        //bases loaded homeRun
        console.log(this.state.batter.name + 'reached by: ', key)
        this.setState({
          third: this.state.second,
          second: this.state.first,
          first: this.state.batter
        })

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: this.state.first,
            first: ''
          })
        }, 300);

        setTimeout(() => {
          this.setState({
            third: this.state.second,
            second: ''
          })
        }, 600);

        setTimeout(() => {
          this.setState({
            third: '',
            currentScore: this.state.currentScore + 4,
            inningRuns: this.state.inningRuns + 4
          });
        }, 900);
        return;
      }
    }
  }
}