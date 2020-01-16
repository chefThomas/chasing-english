import React, { Component } from "react";
import {
  Form,
  DatePicker,
  TimePicker,
  Button,
  Input,
  InputNumber,
  Select,
  Radio
} from "antd";
// import moment from "moment";

const { Option } = Select;

class TimeRelatedForm extends Component {
  state = {
    title: "",
    startDate: null,
    startDateString: null,
    endDate: null,
    endDateString: null,
    meetingTime: null,
    meetingDay: [],
    capacity: 1,
    enrolled: 0,
    type: null,
    status: "active"
  };

  initialState = {
    title: "",
    startDate: null,
    endDate: null,
    meetingTime: null,
    meetingDay: [],
    capacity: 1,
    enrolled: 0,
    type: null,
    status: "active"
  };

  handleTypeChange = e => {
    const { value } = e.target;
    value === "individual"
      ? this.setState({ type: value, title: "Ind. Sessions" })
      : this.setState({ type: value, title: "" });
  };
  handleSizeChange = value => {
    console.log(value);
    this.setState({ capacity: value });
  };

  handleTitleChange = e => {
    const { value } = e.target;
    this.setState({ title: value });
  };

  handleGroupStartChange = (date, dateString) => {
    console.log("date string: ", dateString);
    console.log("date obj: ", date);
    this.setState({ startDate: date });
  };

  handleGroupEndChange = (date, dateString) => {
    this.setState({ endDate: date });
  };

  handleGroupTimeChange = (time, timeString) => {
    console.log("timeString: ", timeString);
    this.setState({ meetingTime: timeString });
  };

  handleDayChange = value => {
    console.log(value);
    this.setState({ meetingDay: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const dateString = {
      startDate: this.state.startDate.format("MM/DD/YY"),
      endDate: this.state.startDate.format("MM/DD/YY")
    };

    this.props.addSession({ ...this.state, ...dateString });
    this.setState(this.initialState);
  };

  render() {
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item>
          <Radio.Group value={this.state.type} onChange={this.handleTypeChange}>
            <Radio.Button value="individual">Individual</Radio.Button>
            <Radio.Button value="group">Group</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          style={this.state.type !== "group" ? { display: "none" } : null}
          label="Title"
        >
          <Input
            style={{ width: "40%" }}
            label="Title"
            placeholder="course title"
            id="title"
            allowClear
            onChange={this.handleTitleChange}
            value={this.state.title}
          />
        </Form.Item>
        <Form.Item label="Date Range">
          <DatePicker
            style={{ marginBottom: "5px" }}
            format="MM-DD-YYYY"
            placeholder="Start Date"
            onChange={this.handleGroupStartChange}
            value={this.state.startDate}
          />
          <br></br>
          <DatePicker
            format="MM-DD-YYYY"
            placeholder="End Date"
            onChange={this.handleGroupEndChange}
            value={this.state.endDate}
          />
        </Form.Item>
        <Form.Item label="Meeting Time">
          <TimePicker
            format="h:mm a"
            use12Hours
            onChange={this.handleGroupTimeChange}
          />
        </Form.Item>
        <Form.Item label="Meeting Day(s)">
          <Select
            mode="multiple"
            style={{ width: "40%" }}
            placeholder="Please select"
            onChange={this.handleDayChange}
            value={this.state.meetingDay}
          >
            <Option key="Mon ">Mon</Option>
            <Option key="Tue ">Tue</Option>
            <Option key="Wed ">Wed</Option>
            <Option key="Thu ">Thu</Option>
            <Option key="Fri ">Fri</Option>
            <Option key="Sat ">Sat</Option>
            <Option key="Sun ">Sun</Option>
          </Select>
        </Form.Item>
        {this.state.type === "group" ? (
          <Form.Item label="Seats">
            <InputNumber
              min={0}
              onChange={this.handleSizeChange}
              value={this.state.capacity}
            />
          </Form.Item>
        ) : null}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedTimeRelatedForm = Form.create({ name: "time_related_controls" })(
  TimeRelatedForm
);

export default WrappedTimeRelatedForm;
