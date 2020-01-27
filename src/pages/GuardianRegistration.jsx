import React, { Component } from 'react';
import GuardianRegistrationForm from '../components/GuardianRegistrationForm';
import { notification } from 'antd';
import '../stylesheets/css/main.css';

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
      <div className="GuardianRegistration">
        <GuardianRegistrationForm register={this.props.register} />
      </div>
    );
  }
}

export default GuardianRegistration;
