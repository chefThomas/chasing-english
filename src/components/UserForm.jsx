import React, { Component } from "react";
import { Button, Form, Input, Radio } from "antd";

class UserForm extends Component {
  state = {
    type: "student"
  };
  clearForm = () => {
    this.props.form.setFieldsValue({
      firstName: "",
      lastName: "",
      email: "",
      type: null
    });
  };

  handleTypeChange = ({ target }) => {
    const { value } = target;
    this.setState({ type: value });
  };
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        //api call
        this.props.addUser(values);

        this.clearForm();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        hideRequiredMark={true}
        layout="vertical"
        onSubmit={this.handleSubmit}
        onCancel={this.clearForm}
      >
        <Form.Item>
          {getFieldDecorator("type", {
            rules: [{ required: true, message: "Please choose a type" }],
            initialValue: "student"
          })(
            <Radio.Group onChange={this.handleTypeChange}>
              <Radio value="student">Student</Radio>
              <Radio value="admin">Administrator</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("firstName", {
            rules: [{ required: true, message: "Please input first name" }],
            initialValue: null
          })(
            <Input
              style={{ bottomMargin: "5px" }}
              placeholder="First name (required)"
            ></Input>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("lastName", {
            rules: [
              {
                required: true,
                message: "Please input last name"
              }
            ],
            initialValue: null
          })(<Input placeholder="Last name (required)"></Input>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please input valid email",
                type: "email"
              }
            ],
            initialValue: null
          })(<Input placeholder="Email (required)"></Input>)}
        </Form.Item>
        {this.state.type === "student" ? (
          <>
            <Form.Item>
              {getFieldDecorator("guardian_email", {
                rules: [
                  {
                    required: true,
                    message: "Please input valid email",
                    type: "email"
                  }
                ],
                initialValue: null
              })(<Input placeholder="Guardian's email (required)"></Input>)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("guardian_phone", {
                rules: [
                  {
                    required: false,
                    message: "Please input valid phone number"
                  }
                ],
                initialValue: null
              })(<Input placeholder="Guardian's phone (optional)"></Input>)}
            </Form.Item>
          </>
        ) : (
          <Form.Item></Form.Item>
        )}

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

const WrappedUserForm = Form.create({ name: "user_form" })(UserForm);

export default WrappedUserForm;
