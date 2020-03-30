import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import NavButton from '../components/NavButton';

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
    const center = { marginLeft: 'auto', marginRight: 'auto' };
    return (
      <>
        <Result
          status="success"
          title="Enrollment was successful"
          subTitle={
            'Thank you for enrolling! Please be on the lookout for an email with details on the course(s) your student is now enrolled in.'
          }
        />
        <NavButton
          class="top-margin-lg NavButton dark-on-light center-inline"
          to="/catalog"
          label="Go to catalog"
          styleMod={center}
        />
      </>
    );
  }
}

export default withRouter(Success);
