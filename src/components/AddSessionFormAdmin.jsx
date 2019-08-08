import React, { Component } from "react";
import { Form, DatePicker, Radio, Button } from "antd";
import moment from "moment";

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
    // console.log("handling submit", this.state.moment);
    if (this.state.when.length === 0) {
      //
    }
    this.props.addSession(this.state);
    this.setState({ when: "", sessionType: "Group" });
  };

  render() {
    console.log(this.props.form);
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

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Date and Time to Start Session">
          <DatePicker
            defaultValue={moment()}
            showTime={{ use12hours: true, format: "HH:mm" }}
            onOk={this.onOk}
            format="MMMM Do YY, h:mm a"
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 }
          }}
        >
          <div>
            <Radio.Group onChange={this.onChange} defaultValue="Group">
              <Radio.Button value="Group">Group</Radio.Button>
              <Radio.Button value="Individual">Individual</Radio.Button>
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
