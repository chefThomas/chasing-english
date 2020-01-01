import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/css/main.css";

// import DropdownNav from "./DropdownNav";
// import NavButton from "./NavButton";
import HamburgerMenu from "./HamburgerMenu";

class Navbar extends Component {
  state = {
    showDropdownNav: false
  };

  handleClick = e => {
    console.log("click burger");
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
    this.props.toggleLogin();
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
            to="/register"
          >
            Register
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
        <HamburgerMenu
          toggleSideNav={this.toggleSideNav}
          showSideNav={this.props.showSideNav}
        />
        <div className="Navbutton-container">
          <button
            className="NavButton dark-on-dark navbar"
            label="Log in"
            onClick={this.handleLoginClick}
          >
            Log In
          </button>
          {/* toggle signup form */}
          <button
            className="NavButton dark-on-dark navbar"
            label="Sign up"
            onClick={this.handleSignupClick}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default Navbar;
