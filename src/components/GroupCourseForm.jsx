import React, { Component } from "react";
import { Form, DatePicker, TimePicker, Button, Input, InputNumber } from "antd";
import moment from "moment";

class TimeRelatedForm extends Component {
  state = {
    groupTitle: "",
    groupStartDate: "",
    groupEndDate: "",
    groupTime: "",
    groupNumberSeats: 0
  };

  handleGroupTitleChange = e => {
    this.setState({ groupTitle: e.target.value });
  };

  handleGroupStartChange = (date, dateString) => {
    this.setState({ groupStartDate: dateString });
  };

  handleGroupEndChange = (date, dateString) => {
    this.setState({ groupEndDate: dateString });
  };

  handleGroupTimeChange = (time, timeString) => {
    this.setState({ groupTime: timeString });
  };

  render() {
    // const { getFieldDecorator } = this.props.form;
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
        <Form.Item>
          <Input
            placeholder="course title"
            id="groupTitle"
            allowClear
            onChange={this.handleGroupTitleChange}
            value={this.state.groupTitle}
          />
        </Form.Item>
        <Form.Item>
          <DatePicker
            format="MM-DD-YYYY"
            placeholder="Start Date"
            onChange={this.handleGroupStartChange}
          />{" "}
          <br></br>
          <DatePicker
            format="MM-DD-YYYY"
            placeholder="End Date"
            onChange={this.handleGroupEndChange}
          />
        </Form.Item>
        <Form.Item>
          <TimePicker
            use12Hours
            placeHoleder="Meeting Time"
            format="h:mm a"
            onChange={this.handleGroupTimeChange}
            defaultOpenValue={moment("08:00:00", "HH:mm:ss")}
          />
        </Form.Item>
      </Form>
    );
  }
}

const WrappedTimeRelatedForm = Form.create({ name: "time_related_controls" })(
  TimeRelatedForm
);

export default WrappedTimeRelatedForm;
