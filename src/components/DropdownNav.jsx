import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import "../stylesheets/css/main.css";

class DropdownNav extends Component {
  handleCloseDropdown = e => {
    if (window.innerWidth > 700) {
      this.props.closeDropdown();
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
      <div className={this.props.display}>
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

export default withRouter(DropdownNav);
