import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { message } from 'antd';
import GuardianRegistrationForm from '../components/GuardianRegistrationForm';
import { notification, Result } from 'antd';
import AntLogin from '../components/AntLogin';

class GuardianRegistration extends Component {
  state = {
    showRegistrationForm: true,
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
      this.setState({ showRegistrationForm: false, postLoginRedirect: true });
    }
  };

  componentDidMount() {
    this.openNotification();
  }
  render() {
    return (
      <div className="GuardianRegistration">
        {this.props.errorMessage
          ? message.error(this.props.errorMessage)
          : null}
        {this.props.registrationEvent ? (
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
              subTitle="You are now registered. Please login below."
            />
            <AntLogin login={this.props.login} />
          </div>
        ) : (
          <GuardianRegistrationForm
            register={this.props.register}
            redirectToCatalog={this.redirectToCatalog}
          />
        )}
        {this.props.user ? <Redirect to="/catalog" /> : null}
      </div>
    );
  }
}

export default withRouter(GuardianRegistration);
