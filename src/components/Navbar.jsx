import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/css/main.css";

import DropdownNav from "./DropdownNav";
import NavButton from "./NavButton";
import HamburgerMenu from "./HamburgerMenu";
// import HamburgerMenu from "./HamburgerMenu";

class Navbar extends Component {
  state = {
    showDropDownNav: false
  };

  handleClick = e => {
    console.log("click burger");
  };

  // toggles visibility on click
  toggleDropdown = e => {
    this.setState({ showDropdownNav: !this.state.showDropdownNav });
  };

  // closes on screen resize
  closeDropdown = e => {
    this.setState({ showNav: false });
  };

  render() {
    const { showDropdownNav } = this.state;
    return (
      <div className="Navbar">
        <DropdownNav
          class={showDropdownNav ? "DropdownNav" : "Dropdown-nav-hide"}
          closeDropdown={this.closeDropdown}
        />
        <div className="Navbar-links-container">
          <NavLink
            exact
            className="Navbar-link"
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
          showDropdownNav={this.state.showDropdownNav}
          toggleDropdown={this.toggleDropdown}
        />
        <div className="Navbutton-container">
          <NavButton label="Log in" to="/schedule" />
          <NavButton label="Sign up" to="/schedule" />
        </div>
      </div>
    );
  }
}

export default Navbar;
