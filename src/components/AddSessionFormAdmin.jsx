import React, { Component } from "react";
import { Form, DatePicker, Radio, Button } from "antd";
import "../stylesheets/css/main.css";

class AddSessionFormAdmin extends Component {
  state = {
    month: 0,
    date: 0,
    year: 0,
    hour: 0,
    minute: 0,
    sessionType: "group"
  };

  onChange = e => {
    console.log(e.target.value);
    this.setState({ sessionType: e.target.value });
  };

  onOk = value => {
    const date = value.date();
    const month = value.month();
    const year = value.year();
    const hour = value.hour();
    const minute = value.minute();
    this.setState({ date, month, year, hour, minute });
  };

  handleSubmit = e => {
    e.preventDefault();
    try {
      console.log("submitted");
      this.props.addSession(this.state);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Date and Time to Start Session">
          {getFieldDecorator("date-time-picker", config)(
            <DatePicker
              //   onChange={this.onChange}
              onOk={this.onOk}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 }
          }}
        >
          <div>
            <Radio.Group required onChange={this.onChange} defaultValue="group">
              <Radio.Button value="group">Group</Radio.Button>
              <Radio.Button value="individual">Individual</Radio.Button>
            </Radio.Group>
          </div>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedTimeRelatedForm = Form.create({ name: "time_related_controls" })(
  AddSessionFormAdmin
);

export default WrappedTimeRelatedForm;
