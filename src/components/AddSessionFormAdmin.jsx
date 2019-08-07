import React, { Component } from "react";
import { Form, DatePicker, Radio, Button } from "antd";

class AddSessionFormAdmin extends Component {
  state = {
    when: "",
    sessionType: "Group"
  };

  onChange = e => {
    // adds tutoring session type to state
    console.log(e.target.value);
    this.setState({ sessionType: e.target.value });
  };

  onOk = value => {
    console.log("in formAdmin: ", value.format("h:mm a"));
    const when = `${value.format("dddd, MMMM Do YYYY, h:mm a")}`;
    this.setState({ when });
  };

  handleSubmit = e => {
    e.preventDefault();
    try {
      console.log("handling submit", this.state.moment);
      this.props.addSession(this.state);
      this.setState({ when: "", sessionType: "Group" });
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
              showTime={{ use12hours: true, format: "HH:mm" }}
              onOk={this.onOk}
              format="MMMM Do YY, h:mm a"
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
              <Radio.Button value="Group">Group</Radio.Button>
              <Radio.Button value="Single">Individual</Radio.Button>
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
