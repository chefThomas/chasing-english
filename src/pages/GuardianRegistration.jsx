import React, { Component } from 'react';
import GuardianRegistrationForm from '../components/GuardianRegistrationForm';
import { notification, Result } from 'antd';
import AntLogin from '../components/AntLogin';

class GuardianRegistration extends Component {
  state = {
    showForm: false,
  };
  openNotification = () => {
    notification.info({
      description:
        'Register to access a catalog of current program offerings and enroll.',
      duration: 4,
    });
  };

  checkRegistration = () => {
    if (this.props.registrationSuccess) {
      this.setState({ showForm: false });
    }
  };

  handleLoginButtonClick = () => {
    // nav to login page
    this.setState({ showForm: true });
  };
  componentDidMount() {
    this.openNotification();
  }
  render() {
    return (
      <div className="GuardianRegistration">
        {this.state.showForm ? (
          <GuardianRegistrationForm register={this.props.register} />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Result
              style={{
                marginRight: 'auto',
                marginLeft: 'auto',
              }}
              status="success"
              title="Welcome to Chasing English!"
              subTitle="You are now registered and ready to enroll your student. Please login to view all course offerings."
            />
            <AntLogin />

            {/* login form goes here */}
          </div>
        )}
      </div>
    );
  }
}

export default GuardianRegistration;
