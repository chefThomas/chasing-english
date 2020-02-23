import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Result } from 'antd';
class Success extends Component {
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

export default withRouter(Success);
