import React, { Component } from 'react';
import GuardianRegistrationForm from '../components/GuardianRegistrationForm';
import { notification } from 'antd';
import '../stylesheets/css/main.css';

const Style = {
  maxWidth: '700px',
  border: '1px solid #e8e8e8',
  padding: '3rem 3rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '3rem',
};

class GuardianRegistration extends Component {
  state = {};

  openNotification = () => {
    notification.info({
      description:
        'Register to access a catalog of current program offerings and enroll.',
      duration: 4,
    });
  };

  componentDidMount() {
    this.openNotification();
  }
  render() {
    return (
      <div className="GuardianRegistration" style={Style}>
        <GuardianRegistrationForm />
      </div>
    );
  }
}

export default GuardianRegistration;
