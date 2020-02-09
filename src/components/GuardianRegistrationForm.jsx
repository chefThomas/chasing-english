import React, { Component } from 'react';

import { Form, Input, Tooltip, Icon, Select, PageHeader } from 'antd';

import '../stylesheets/css/main.css';

const { Option } = Select;

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    selectedPrograms: [],
  };

  clearForm = () => {
    console.log('clearForm called');
    this.props.form.setFieldsValue({
      guardianFirstName: '',
      guardianLastName: '',
      guardianEmail: '',
      password: '',
      grade: null,
      phone: '',
      guardianId: '',
      contactMethod: '',
      studentFirstName: null,
      studentLastName: '',
      studentGmail: '',
      confirm: '',
    });

    this.setState({ selectedPrograms: [] });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.programsOfInterest = this.state.selectedPrograms;
        values.phone = `${values.prefix} ${values.phone}`;
        console.log('Received values of form: ', values);
        this.props.register(values);
        //clear form
        this.clearForm();
      }
    });
  };

  handleProgramChange = selectedPrograms => {
    this.setState({ selectedPrograms });
    console.log(this.state.selectedPrograms);
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback("Passwords don't match");
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
        xs: { span: 15 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },

      layout: 'horizontal',
    };

    const areaCode = getFieldDecorator('prefix', {
      initialValue: '(206)',
    })(
      <Input
        style={{
          border: '0',
          margin: '0',
          padding: '0 0',
          width: '3rem',
          backgroundColor: '#fff',
        }}
      ></Input>
    );

    return (
      <>
        <Form
          className="RegistrationForm"
          {...formItemLayout}
          colon={false}
          onSubmit={this.handleSubmit}
          style={this.Style}
        >
          <h1
            style={{
              textAlign: 'center',
            }}
          >
            Registration{' '}
          </h1>

          <PageHeader title="Guardian" />
          <Form.Item label={<span>Name&nbsp;</span>}>
            {getFieldDecorator('guardianFirstName', {
              rules: [
                {
                  required: true,
                  message: 'Please input your first name',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="First" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('guardianLastName', {
              rules: [
                {
                  required: true,
                  message: 'Please input your last name',
                  whitespace: true,
                },
              ],
            })(<Input style={{ marginLeft: 'auto' }} placeholder="Last" />)}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator('guardianEmail', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid Email',
                },
                {
                  required: true,
                  message: 'Please input your Email',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [
                { required: true, message: 'Please input your phone number' },
              ],
            })(
              <Input
                placeholder="123-4567"
                addonBefore={areaCode}
                style={{ paddingLeft: '0', width: '60%' }}
              />
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
            {getFieldDecorator('confirmPassword', {
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
          <Form.Item
            label={
              <span>
                Contact Method&nbsp;
                <Tooltip title="How would you like to be contacted?">
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
                addonBefore={areaCode}
                style={{ paddingLeft: '0', width: '40%' }}
              >
                <Option value="email">Email</Option>
                <Option value="voice">Voice</Option>
                <Option value="text">Text</Option>
              </Select>
            )}
          </Form.Item>
          <PageHeader title="Student" />
          <Form.Item label={<span>Student Name&nbsp;</span>}>
            {getFieldDecorator('studentFirstName', {
              rules: [
                {
                  required: true,
                  message: "Please input student's first name",
                  whitespace: true,
                },
              ],
            })(<Input placeholder="First" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('studentLastName', {
              rules: [
                {
                  required: true,
                  message: "Please input student's last name",
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Last" />)}
          </Form.Item>
          <Form.Item
            hasFeedback
            label={
              <span>
                Student Gmail&nbsp;
                <Tooltip title="A private Gmail account is needed to access Google Classroom">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('studentGmail', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid Email',
                },
                {
                  required: true,
                  message: "Please input the student's Gmail address",
                },
              ],
            })(<Input placeholder="*.gmail.com" />)}
          </Form.Item>
          <Form.Item label="Grade">
            {getFieldDecorator('grade', {
              rules: [
                {
                  required: true,
                  message: "Please select the student's grade level",
                },
              ],
            })(
              <Select style={{ width: '20%' }}>
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
          <PageHeader title="Programs" />
          <Form.Item label="Programs">
            {getFieldDecorator('programsOfInterest', {
              rules: [
                {
                  message: 'Please choose at least one option',
                },
              ],
            })(
              <Form.Item>
                <Select
                  value={this.state.selectedPrograms}
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="You may select more than one program"
                  onChange={this.handleProgramChange}
                  // value={this.state.selectedPrograms}
                >
                  <Option key="group">Group</Option>
                  <Option key="intensive">One-day Intensive</Option>
                  <Option key="individual">Indivudal Coaching</Option>
                </Select>
              </Form.Item>
            )}
          </Form.Item>
          <button
            className="top-margin-lg NavButton dark-on-light navbar center-inline"
            label="Log in"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </Form>
      </>
    );
  }
}

const GuardianRegistrationForm = Form.create({ name: 'register' })(
  RegistrationForm
);

export default GuardianRegistrationForm;
