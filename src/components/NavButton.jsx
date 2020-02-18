import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NavButton extends Component {
  onClick = e => {
    const { history, to } = this.props;
    history.push(to);
  };

  render() {
    return (
      <button className={this.props.class} onClick={this.onClick}>
        {this.props.label}
      </button>
    );
  }
}

export default withRouter(NavButton);
