import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import '../stylesheets/css/main.css';

import HamburgerMenu from './HamburgerMenu';

class Navbar extends Component {
  handleClick = e => {
    console.log('click burger');
  };

  // toggles visibility on click
  toggleSideNav = () => {
    // this.setState({ showDropdownNav: !this.state.showDropdownNav });
    // console.log("in nav");
    this.props.toggleSideNav();
  };

  // closes when screen width increased greater than 700px from less.
  closeDropdown = e => {
    this.setState({ showDropdownNav: false });
  };

  handleLoginClick = e => {
    // display login form
  };

  handleSignupClick = e => {
    this.props.toggleSignup();
    // push sign up form into v
  };

  render() {
    // const { showDropdownNav } = this.state;
    return (
      <div className="Navbar">
        <div className="Navbar-links-container">
          <NavLink
            exact
            className="Navbar-link "
            activeClassName="NavLink-active"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            exact
            className="Navbar-link"
            activeClassName="NavLink-active"
            to="/catalog"
          >
            Catalog
          </NavLink>
          <NavLink
            exact
            className="Navbar-link"
            activeClassName="NavLink-active"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            exact
            className="Navbar-link"
            activeClassName="NavLink-active"
            to="/admin"
          >
            Admin
          </NavLink>
        </div>
        <HamburgerMenu />
        <div className="Navbutton-container">
          <button
            className="NavButton dark-on-dark navbar"
            label="Log in"
            onClick={this.handleLoginClick}
          >
            Log In
          </button>
          <Link to="/guardian-registration">
            <button className="NavButton dark-on-dark navbar" label="Sign up">
              Register
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
