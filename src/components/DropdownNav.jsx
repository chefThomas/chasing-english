import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/css/main.css";

export default class DropdownNav extends Component {
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
          exact
          className="DropdownLink home-link"
          activeClassName="DropdownLink-active"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          exact
          className="DropdownLink info-link"
          activeClassName="DropdownLink-active"
          to="/info"
        >
          Services
        </NavLink>
        <NavLink
          exact
          className="DropdownLink schedule-link"
          activeClassName="DropdownLink-active"
          to="/schedule"
        >
          Book
        </NavLink>
        <NavLink
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
