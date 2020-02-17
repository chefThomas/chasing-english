import React, { Component } from 'react';
import { Result } from 'antd';
export default class About extends Component {
  render() {
    return (
      <Result
        status="success"
        title="Enrollment is successful"
        subTitle="Please note meeting times"
      />
    );
  }
}
