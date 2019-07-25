import React, { Component } from "react";
import "../stylesheets/css/main.css";

export default class HamburgerMenu extends Component {
  state = {
    clicked: false
  };
  render() {
    return (
      <div>
        <div
          className={
            this.state.clicked ? "HamburgerMenu-clicked" : "HamburgerMenu"
          }
        />
      </div>
    );
  }
}
