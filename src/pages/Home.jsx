import React, { Component } from "react";
import "../stylesheets/css/main.css";
import icon from "../static/logo.svg";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-top-segment">
          <div className="icon-container">
            <img className="icon-full" src={icon} alt="icon" />
            <h1 className="motto">
              <span className="line1">Chasing</span>
              <span className="line2">English</span>{" "}
              <span className="line3">writing support for the future</span>{" "}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
