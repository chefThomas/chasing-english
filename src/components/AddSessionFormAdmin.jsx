import React, { Component } from "react";
import { Form, DatePicker, Radio, Button } from "antd";
import moment from "moment";

class AddSessionFormAdmin extends Component {
  state = {
    when: "",
    type: "Group"
  };

  onChange = e => {
    // adds tutoring session type to state
    console.log("in type change", e.target.value);
    this.setState({ ...this.state, type: e.target.value });
  };

  onOk = value => {
    const when = `${value.format("dddd, MMMM Do YYYY, h:mm a")}`;
    this.setState({ when });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addSession(this.state);
  };

  componentDidMount() {
    //sets state.when to current date-time
    const now = moment();
    this.onOk(now);
  }

  render() {
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
            // onChange={this.handleDatePickerChange}
            defaultValue={moment()}
            showTime={{ use12hours: true, format: "HH:mm" }}
            onOk={this.onOk}
            format="MMMM Do YY, h:mm a"
            selectedValue={this.state.when}
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
