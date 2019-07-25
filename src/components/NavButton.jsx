import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../stylesheets/css/main.css";

class NavButton extends Component {
  onClick = e => {
    const { history, to } = this.props;
    history.push(to);
  };

  render() {
    return (
      <button className="NavButton" onClick={this.onClick}>
        {this.props.label}
      </button>
    );
  }
}

export default withRouter(NavButton);
