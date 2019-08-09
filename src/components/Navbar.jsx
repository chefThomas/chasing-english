import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/css/main.css";

// import DropdownNav from "./DropdownNav";
// import NavButton from "./NavButton";
import HamburgerMenu from "./HamburgerMenu";
// import HamburgerMenu from "./HamburgerMenu";

class Navbar extends Component {
  state = {
    showDropDownNav: false
  };

  // handleClick = e => {
  //   console.log("click burger");
  // };

  // toggles visibility on click
  toggleDropdown = e => {
    this.setState({ showDropdownNav: !this.state.showDropdownNav });
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
    const { showDropdownNav } = this.state;
    return (
      <div className="Navbar">
        {/* <DropdownNav
          display={showDropdownNav ? "DropdownNav" : "Dropdown-nav-hide"}
          closeDropdown={this.closeDropdown}
        /> */}
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
            to="/info"
          >
            Services
          </NavLink>
          <NavLink
            exact
            className="Navbar-link"
            activeClassName="NavLink-active"
            to="/schedule"
          >
            Book
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
          showDropdownNav={showDropdownNav}
          toggleDropdown={this.toggleDropdown}
        />
        <div className="Navbutton-container">
          <button
            class="NavButton dark-on-dark navbar"
            label="Log in"
            onClick={this.handleLoginClick}
          >
            Log In
          </button>
          {/* toggle signup form */}
          <button
            class="NavButton dark-on-dark navbar"
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
