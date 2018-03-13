import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';

class NewPack extends React.Component {
  constructor() {
    super()
    this.state = {
      active: 0,
      hasFlippedYet: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(direction) {
    direction === 'next' ? this.setState({ active: this.state.active + 1, hasFlippedYet: true }) : this.setState({ active: this.state.active - 1 })
  }

  handleClickOutside = evt => {
    this.props.displayPack(false)
  };

  render() {
    const { newPack } = this.props;
    return (
      <div id="new-pack" className="animated zoomIn">
        {
          newPack && newPack.map((card, idx) => {
            let isActive;
            idx === this.state.active ? isActive = 'active-new-pack-image' : isActive = 'hidden-new-pack-image'
            let shouldFlip = idx === 0 && !this.state.hasFlippedYet ? '' : 'animated flipInY'
            return (
              <div key={idx} className={`new-pack-image ${isActive} ${shouldFlip}`}>
                {
                  idx > 0 && <button id="new-pack-previous-button" onClick={() => this.handleClick('previous')}>Previous</button>
                }
                <img src={card.image} className="player-img" />
                {
                  idx < newPack.length - 1 && <button id="new-pack-next-button" onClick={() => this.handleClick('next')}>Next</button>
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

export default withRouter(connect(mapState)(onClickOutside(NewPack)));
