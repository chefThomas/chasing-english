import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import getCredentials from '../utilities/getCredentialsFromLocalStorage.js';

import { Result } from 'antd';
class Success extends Component {
  componentDidMount() {
    // relogin on refresh
    const { user } = this.props;
    const credentials = getCredentials();
    console.log(user, credentials);
    if (!user && credentials) {
      this.props.login(credentials);
    }
  }
  render() {
    return (
      <Result
        status="success"
        title="Enrollment was successful"
        subTitle={'You will receive an email shortly...'}
      />
    );
  }
}

export default withRouter(Success);
