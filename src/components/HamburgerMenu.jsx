import React, { Component } from "react";
import "../stylesheets/css/main.css";

export default class HamburgerMenu extends Component {
  handleClick = e => {
    this.props.toggleDropdown();
  };

  render() {
    const { showDropdownNav } = this.props;
    console.log(showDropdownNav);

    return (
      <div className="Hamburger-container" onClick={this.handleClick}>
        <div className={showDropdownNav ? "transparent-bar" : "top"} />
        <div className={showDropdownNav ? "center1-rotate" : "center1"} />
        <div className={showDropdownNav ? "center2-rotate" : "center2"} />
        <div className={showDropdownNav ? "transparent-bar" : "bottom"} />
      </div>
    );
  }
}
