import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/css/main.css";

import DropdownNav from "./DropdownNav";
import NavButton from "./NavButton";
import HamburgerMenu from "./HamburgerMenu";

class Navbar extends Component {
  state = {
    showNav: false
  };

  handleClick = e => {
    console.log("click burger");
  };

  toggleDropdown = e => {
    this.setState({ showNav: !this.state.showNav });
  };

  closeDropdown = e => {
    this.setState({ showNav: false });
  };

  render() {
    return (
      <div className="Navbar">
        <DropdownNav
          class={this.state.showNav ? "DropdownNav" : "Dropdown-nav-hide"}
          closeDropdown={this.closeDropdown}
        />
        <i
          onClick={this.toggleDropdown}
          className="Navbar-burger fas fa-bars"
        />
        {/* <HamburgerMenu toggleDropdown={this.toggleDropdown}/> */}
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
          {/* <NavLink
            exact
            className="Navbar-link"
            activeClassName="NavLink-active"
            to="/payment"
          >
            Payment
          </NavLink> */}
          <NavLink
            exact
            className="Navbar-link"
            activeClassName="NavLink-active"
            to="/about"
          >
            About
          </NavLink>
        </div>
        <div className="Navbutton-container">
          <NavButton label="Log in" to="/schedule" />
          <NavButton label="Sign up" to="/schedule" />
        </div>
      </div>
    );
  }
}

export default Navbar;
