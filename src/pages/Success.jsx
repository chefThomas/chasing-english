import React, { Component } from 'react';
import { Result } from 'antd';
export default class About extends Component {
  render() {
    return (
      <Result
        status="success"
        title="Enrollment was successful"
        subTitle={this.props.match.params.session_id}
      />
    );
  }
}
