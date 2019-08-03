import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/css/main.css";

// import DropdownNav from "./DropdownNav";
import NavButton from "./NavButton";
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

  handleSignupClick = e => {
    this.props.toggleForm();
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
        </div>
        <HamburgerMenu
          showDropdownNav={showDropdownNav}
          toggleDropdown={this.toggleDropdown}
        />
        <div className="Navbutton-container">
          <NavButton
            class="NavButton dark-on-dark navbar"
            label="Log in"
            to="/schedule"
          />
          {/* toggle signup form */}
          <button
            class="NavButton dark-on-dark navbar"
            label="Sign up"
            onClick={this.handleSignupClick}
          >
            Click me
          </button>
        </div>
      </div>
    );
  }
}

export default Navbar;
