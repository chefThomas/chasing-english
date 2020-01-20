import React, { Component } from 'react';

import {
  Form,
  Heading,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  PageHeader,
} from 'antd';

import '../stylesheets/css/main.css';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const courseTypes = [
  {
    value: 'Individual Coaching',
    label: 'Individual Coaching',
  },
  {
    value: 'Group Sessions',
    label: 'Group Sessions',
  },
];

const grades = ['6', '7', '8', '9', '10', '11', '12', 'Post high school'];

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    // current: 0,
    // guardianFirstName: null,
    // guardianLastName: null,
    // guardianEmail: null,
    // guardianPhone: null,
    // contactPreference: '',
    // studentFirstName: null,
    // studentLastName: null,
    // courseInfo: null,
    // grade: null,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const areaCode = getFieldDecorator('prefix', {
      initialValue: '(206)',
    })(
      <Input
        style={{ border: '0', margin: '0', padding: '0 0', width: '3rem' }}
      ></Input>
    );

    return (
      <Form {...formItemLayout} colon={false} onSubmit={this.handleSubmit}>
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          Registration{' '}
        </h1>
        Note: all fields are required
        <PageHeader title="Guardian" />
        <Form.Item
          label={
            <span>
              Guardian Name&nbsp;
              <Tooltip title="How would you like to be addressed?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('guardian name', {
            rules: [
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid Email!',
              },
              {
                required: true,
                message: 'Please input your Email!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [
              { required: true, message: 'Please input your phone number!' },
            ],
            initialValue: '123-4567',
          })(
            <Input
              addonBefore={areaCode}
              style={{ paddingLeft: '0', width: '100%' }}
            />
          )}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Contact Method&nbsp;
              <Tooltip title="What is your preferred method of contact?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('contactMethod', {
            rules: [
              {
                required: true,
                message: 'Please choose your preferred contact method!',
              },
            ],
          })(
            <Select
              placeholder="Email"
              defaultValue="email"
              addonBefore={areaCode}
              style={{ paddingLeft: '0', width: '100%' }}
            >
              <Option value="email">Email</Option>
              <Option value="voice">Voice</Option>
              <Option value="text">Text</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <PageHeader title="Student" />
        <Form.Item
          label={
            <span>
              Student Name&nbsp;
              <Tooltip title="How should the student be addressed?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('student_name', {
            rules: [
              {
                required: true,
                message: "Please input student's name!",
                whitespace: true,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Student Email">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid Email!',
              },
              {
                required: true,
                message: 'Please input your Email!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Grade" hasFeedback>
          {getFieldDecorator('grade', {
            rules: [
              {
                required: true,
                message: "Please select your student's grade level",
              },
            ],
          })(
            <Select placeholder="Please select student's grade">
              <Option value="6">6</Option>
              <Option value="7">7</Option>
              <Option value="8">8</Option>
              <Option value="9">9</Option>
              <Option value="10">10</Option>
              <Option value="11">11</Option>
              <Option value="12">12</Option>
            </Select>
          )}
        </Form.Item>
        <PageHeader title="Courses" />
        <Form.Item
          label={
            <span>
              Guardian Name&nbsp;
              <Tooltip title="How would you like to be addressed?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('guardian name', {
            rules: [
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true,
              },
            ],
          })(<Input />)}
        </Form.Item>
      </Form>
    );
  }
}

const GuardianRegistrationForm = Form.create({ name: 'register' })(
  RegistrationForm
);

export default GuardianRegistrationForm;
