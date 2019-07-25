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
      <div className={this.props.class}>
        <i
          onClick={this.handleClick}
          className="DropdownNav-close fas fa-times"
        />
        <NavLink
          exact
          className="DropdownLink"
          activeClassName="DropdownLink-active"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          exact
          className="DropdownLink"
          activeClassName="DropdownLink-active"
          to="/info"
        >
          Services
        </NavLink>
        <NavLink
          exact
          className="DropdownLink"
          activeClassName="DropdownLink-active"
          to="/schedule"
        >
          Book
        </NavLink>
        <NavLink
          exact
          className="DropdownLink DropdownLink-last"
          activeClassName="DropdownLink-active"
          to="/about"
        >
          About
        </NavLink>
      </div>
    );
  }
}
