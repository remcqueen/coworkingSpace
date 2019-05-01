import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class NavBar extends Component {
  state = {};

  render() {
    const { user } = this.props;

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Share-Space</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ">
            <NavLink className="nav-item nav-link" to="/home">
              Home
            </NavLink>
            <NavLink className="nav-item nav-link" to="/buildings">
              Buildings
            </NavLink>
            {!user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {user && !user.isAdmin && (
              <React.Fragment>
                <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/rooms">Make Booking</NavDropdown.Item>
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              </React.Fragment>
            )}
            {user && user.isAdmin && (
              <React.Fragment>
                <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/rooms">Make Booking</NavDropdown.Item>
                  <NavDropdown.Item href="/bookings">View Bookings</NavDropdown.Item>
                  <NavDropdown.Item href="/rooms/new">Add Room</NavDropdown.Item>
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
