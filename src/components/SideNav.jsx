import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import "../stylesheets/css/main.css";

class SideNav extends Component {
  handleCloseDropdown = e => {
    if (window.innerWidth > 700) {
      this.props.closeSideNav();
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleCloseDropdown);
  }

  handleClick = e => {
    this.props.closeDropdown();
  };

  render() {
    return (
      <div className={this.props.className}>
        <NavLink
          onClick={this.handleClick}
          exact
          className="DropdownLink home-link"
          activeClassName="DropdownLink-active"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          onClick={this.handleClick}
          exact
          className="DropdownLink info-link"
          activeClassName="DropdownLink-active"
          to="/info"
        >
          Services
        </NavLink>
        <NavLink
          onClick={this.handleClick}
          exact
          className="DropdownLink schedule-link"
          activeClassName="DropdownLink-active"
          to="/schedule"
        >
          Book
        </NavLink>
        <NavLink
          onClick={this.handleClick}
          exact
          className="DropdownLink abour-link"
          activeClassName="DropdownLink-active"
          to="/about"
        >
          About
        </NavLink>
      </div>
    );
  }
}

export default withRouter(SideNav);
