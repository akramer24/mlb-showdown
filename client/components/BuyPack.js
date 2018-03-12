import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class BuyPack extends React.Component {
  constructor() {
    super()
    this.state = {
      active: 0,
      previousActive: null
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(direction) {
    direction === 'next' ? this.setState({ active: this.state.active + 1 }) : this.setState({ active: this.state.active - 1 })
  }

  render() {
    const { newPack } = this.props;
    return (
      <div id="new-pack">
        {
          newPack && newPack.map((card, idx) => {
            let isActive;
            idx === this.state.active ? isActive = 'active-new-pack-image' : isActive = 'hidden-new-pack-image'
            return (
              <div key={idx} className={`new-pack-image ${isActive}`}>
                {
                  idx > 0 && <button onClick={() => this.handleClick('previous')}>Previous</button>
                }
                <img src={card.image} className="player-img" />
                {
                  idx < newPack.length - 1 && <button onClick={() => this.handleClick('next')}>Next</button>
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    newPack: state.user.activeUser.newPack
  }
}

export default withRouter(connect(mapState)(BuyPack));