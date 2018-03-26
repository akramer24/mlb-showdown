import React from 'react';
import onClickOutside from 'react-onclickoutside';

class DisplaySubs extends React.Component {
  
  handleClickOutside() {
    this.props.display('displayBench', false)
    this.props.display('displayBullpen', false)
  }
  render() {
    const {display, isBench, bench, bullpen} = this.props;
    const title = isBench ? 'Bench' : 'Bullpen';
    const subType = isBench ? bench : bullpen;

    return (
      <div className="sub">
        <h3>{title} <button className="sub-button" onClick={() => display(`display${title}`, false)}>Hide {title}</button></h3>
        {subType.map(player => {
          return <p key={player.id}>{player.name}, {player.position}
            <button className="sub-button">Insert</button>
          </p>
        })}
      </div>
    )
  }
}

export default onClickOutside(DisplaySubs);