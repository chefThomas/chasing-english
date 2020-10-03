import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Form, message, Input } from 'antd';
import '../stylesheets/css/main.css';

class WaitlistForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log(values);
      if (!err) {
        this.props.addToIndividualWaitlist(values);
        message.info(
          "You've been added to the waitlist and will be contacted when a space is open."
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="AntLogin login-form">
        <Form.Item>
          {getFieldDecorator('guardianName', {
            rules: [{ required: true, message: 'Please input your name' }],
            initialValue: '',
          })(<Input placeholder="Name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email' }],
            initialValue: '',
          })(<Input placeholder="Email" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('studentName', {
            rules: [
              { required: true, message: "Please input the student's name" },
            ],
            initialValue: '',
          })(<Input placeholder="Student's name" />)}
        </Form.Item>
        <button
          className="top-margin-lg NavButton dark-on-light navbar center-inline"
          label="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </Form>
    );
  }
}

const IndividualWaitlistForm = Form.create({ name: 'normal_login' })(
  WaitlistForm
);

export default withRouter(IndividualWaitlistForm);
