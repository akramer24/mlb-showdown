import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import navTo from './utils/navTo';

const NavBar = ({ handleClick, isLoggedIn, activeUser }) => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <NavLink to="/">MLB SHOWDOWN</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavDropdown eventKey={1} title="Players" id="basic-nav-dropdown">
          <MenuItem eventKey={1.1}>All</MenuItem>
          <MenuItem eventKey={1.2} onClick={() => navTo('/players/batters')}>Batters</MenuItem>
          <MenuItem eventKey={1.3} onClick={() => navTo('/players/pitchers')}>Pitchers</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        {
          isLoggedIn
            ?
            <NavDropdown eventKey={2} title={activeUser.teamName} id="basic-nav-dropdown">
              <MenuItem eventKey={2.1} onClick={() => navTo(`/users/${activeUser.id}`)}>My team</MenuItem>
              <MenuItem eventKey={2.2} onClick={handleClick}>Log Out</MenuItem>
            </NavDropdown>
            :
            <NavItem onClick={() => navTo('/login')}>Log In</NavItem>
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.activeUser.id,
    activeUser: state.user.activeUser
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavBar)
