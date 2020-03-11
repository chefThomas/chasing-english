import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Form, Icon, Input } from 'antd';
import '../stylesheets/css/main.css';

class NormalLoginForm extends Component {
  // login form displays on GuardianRegistration page when registration event state in Root === true.

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="AntLogin login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Link to="/catalog">
          {' '}
          <button
            className="top-margin-lg NavButton dark-on-light navbar center-inline"
            label="Log in"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </Link>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
);

export default withRouter(WrappedNormalLoginForm);
