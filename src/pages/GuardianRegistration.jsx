import React, { Component } from 'react';
import GuardianRegistrationForm from '../components/GuardianRegistrationForm';
import '../stylesheets/css/main.css';

const Style = {
  maxWidth: '550px',
  border: '1px solid #e8e8e8',
  padding: '3rem 3rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '3rem',
};

class GuardianRegistration extends Component {
  state = {};
  render() {
    return (
      <div className="GuardianRegistration" style={Style}>
        <GuardianRegistrationForm />
      </div>
    );
  }
}

export default GuardianRegistration;
