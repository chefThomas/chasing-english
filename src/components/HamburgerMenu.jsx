import React, { Component } from "react";
import "../stylesheets/css/main.css";

class HamburgerMenu extends Component {
  handleClick = e => {
    this.props.toggleSideNav();
    // console.log("burger click");
    // push page over
  };

  render() {
    const { showSideNav } = this.props;
    return (
      <div className="Hamburger-container" onClick={this.handleClick}>
        <div className={showSideNav ? "transparent-bar" : "top"} />
        <div className={showSideNav ? "center1-rotate" : "center1"} />
        <div className={showSideNav ? "center2-rotate" : "center2"} />
        <div className={showSideNav ? "transparent-bar" : "bottom"} />
      </div>
    );
  }
}

export default HamburgerMenu;
