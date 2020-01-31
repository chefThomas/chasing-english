import React, { Component } from 'react';
import { Button, Divider, Form, Input, Radio, Select } from 'antd';

const { Option } = Select;

const courseOptions = ['Group', 'One-day Intensive', 'Individual Coaching'];

class UserForm extends Component {
  state = {
    type: 'student',
    selectedCourses: [],
  };
  clearForm = () => {
    this.props.form.setFieldsValue({
      firstName: '',
      lastName: '',
      email: '',
      type: null,
    });
  };

  handleTypeChange = ({ target }) => {
    const { value } = target;
    this.setState({ type: value });
    console.log(value);
  };

  handleCourseChange = selectedCourses => {
    this.setState({ selectedCourses });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { type } = values;
        switch (type) {
          case 'admin':
            this.props.addAdmin(values);
            break;
          case 'guardian':
            this.props.addGuardian(values);
            break;
          default:
            this.props.addStudent(values);
        }
        this.clearForm();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedCourses } = this.state;
    const filteredCourses = courseOptions.filter(course => {
      return !selectedCourses.includes(course);
    });
    return (
      <Form
        hideRequiredMark={true}
        layout="vertical"
        onSubmit={this.handleSubmit}
        onCancel={this.clearForm}
      >
        <Form.Item label="Type">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: 'Please choose a type' }],
            initialValue: 'student',
          })(
            <Radio.Group onChange={this.handleTypeChange}>
              <Radio value="admin">Administrator</Radio>
              <Radio value="guardian">Guardian</Radio>
              <Radio value="student">Student</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Divider />
        {this.state.type === 'admin' ? (
          <>
            <Form.Item>
              {getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'Please input first name' }],
                initialValue: null,
              })(
                <Input
                  style={{ bottomMargin: '5px' }}
                  placeholder="First name (required)"
                ></Input>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('lastName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input last name',
                  },
                ],
                initialValue: null,
              })(<Input placeholder="Last name (required)"></Input>)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Please input valid email',
                    type: 'email',
                  },
                ],
                initialValue: null,
              })(<Input placeholder="Email (required)"></Input>)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input password',
                  },
                ],
                initialValue: null,
              })(<Input.Password placeholder="Password (required)" />)}
            </Form.Item>
          </>
        ) : this.state.type === 'student' ? (
          <>
            <Form.Item>
              {getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'Please input first name' }],
                initialValue: null,
              })(
                <Input
                  style={{ bottomMargin: '5px' }}
                  placeholder="First name (required)"
                ></Input>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('lastName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input last name',
                  },
                ],
                initialValue: null,
              })(<Input placeholder="Last name (required)"></Input>)}
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
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Please input valid email',
                    type: 'email',
                  },
                ],
                initialValue: null,
              })(<Input placeholder="Gmail (required)"></Input>)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input password',
                  },
                ],
                initialValue: null,
              })(<Input.Password placeholder="Password (required)" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('guardianEmail', {
                rules: [
                  {
                    message: 'Please input valid email',
                    type: 'email',
                    required: true,
                  },
                ],
                initialValue: null,
              })(<Input placeholder="Guardian's email (required)"></Input>)}
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item label="Guardian">
              {getFieldDecorator('guardianFirstName', {
                rules: [{ required: true, message: 'Please input first name' }],
                initialValue: null,
              })(
                <Input
                  style={{ bottomMargin: '5px' }}
                  placeholder="First name (required)"
                ></Input>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('guardianLastName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input last name',
                  },
                ],
                initialValue: null,
              })(<Input placeholder="Last name (required)"></Input>)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('guardianEmail', {
                rules: [
                  {
                    message: 'Please input valid email',
                    type: 'email',
                    required: true,
                  },
                ],
                initialValue: null,
              })(<Input placeholder="Guardian's email (required)"></Input>)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input password',
                  },
                ],
                initialValue: null,
              })(<Input.Password placeholder="Password (required)" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: false,
                    message: 'Please input valid phone number',
                  },
                ],
                initialValue: null,
              })(<Input placeholder="Guardian's phone (required)"></Input>)}
            </Form.Item>
            <Form.Item label="Preferred Contact Method">
              {getFieldDecorator('contactMethod', {
                rules: [
                  {
                    required: true,
                    message: 'Please choose preferred contact method',
                  },
                ],
                initialValue: 'email',
              })(
                <Radio.Group>
                  <Radio value="email">Email</Radio>
                  <Radio value="voice">Voice</Radio>
                  <Radio value="text">Text</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Divider />
            <Form.Item label="Student Info">
              {getFieldDecorator('studentFirstName', {
                rules: [
                  {
                    required: true,
                    message: "Please input student's first name",
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="First name (required)" />)}
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
              })(<Input placeholder="Last name (required)" />)}
            </Form.Item>

            <Form.Item label={<span>Student Gmail</span>}>
              {getFieldDecorator('studentGmail', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid Email!',
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
            <Form.Item label="Programs of Interest">
              {getFieldDecorator('programsOfInterest', {
                rules: [
                  {
                    required: true,
                    message: 'Please choose at least one course type',
                  },
                ],
              })(
                <Select
                  mode="multiple"
                  placeholder="You may choose multiple programs"
                  value={selectedCourses}
                  onChange={this.handleCourseChange}
                  style={{ width: '100%' }}
                >
                  {filteredCourses.map(item => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </>
        )}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

const WrappedUserForm = Form.create({ name: 'user_form' })(UserForm);

export default WrappedUserForm;
