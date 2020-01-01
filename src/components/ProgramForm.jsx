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
import moment from "moment";

const { Option } = Select;
const initialState = {
  groupTitle: "",
  startDate: "",
  endDate: "",
  meetingTime: "",
  meetingDay: [],
  groupSeats: 1,
  type: null
};

class TimeRelatedForm extends Component {
  state = {
    groupTitle: "",
    startDate: "",
    endDate: "",
    meetingTime: "",
    meetingDay: [],
    groupSeats: 1,
    type: null
  };

  resetState = () => this.setState(initialState);

  handleTypeChange = e => {
    const { value } = e.target;
    this.setState({ type: value });
  };
  handleSizeChange = value => {
    console.log(value);
    this.setState({ groupSeats: value });
  };

  handleGroupTitleChange = e => {
    const { value } = e.target;
    this.setState({ groupTitle: value });
  };

  handleGroupStartChange = (date, dateString) => {
    this.setState({ startDate: dateString });
  };

  handleGroupEndChange = (date, dateString) => {
    this.setState({ endDate: dateString });
  };

  handleGroupTimeChange = (time, timeString) => {
    this.setState({ meetingTime: timeString });
  };

  handleDayChange = value => {
    console.log(value);
    this.setState({ meetingDay: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addSession(this.state);
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
          style={this.state.type !== "group" ? { display: "none" } : {}}
          label="Title"
        >
          <Input
            style={{ width: "40%" }}
            label="Title"
            placeholder="course title"
            id="groupTitle"
            allowClear
            onChange={this.handleGroupTitleChange}
            value={this.state.groupTitle}
          />
        </Form.Item>
        <Form.Item label="Date Range">
          <DatePicker
            style={{ marginBottom: "5px" }}
            format="MM-DD-YYYY"
            placeholder="Start Date"
            onChange={this.handleGroupStartChange}
          />
          <br></br>
          <DatePicker
            format="MM-DD-YYYY"
            placeholder="End Date"
            onChange={this.handleGroupEndChange}
          />
        </Form.Item>
        <Form.Item label="Meeting Time">
          <TimePicker
            use12Hours
            minuteStep={15}
            placeHoleder="Meeting Time"
            format="h:mm a"
            onChange={this.handleGroupTimeChange}
            defaultOpenValue={moment("08:00:00", "HH:mm:ss")}
          />
        </Form.Item>
        <Form.Item label="Meeting Day(s)">
          <Select
            mode="multiple"
            style={{ width: "40%" }}
            placeholder="Please select"
            onChange={this.handleDayChange}
          >
            <Option key="Monday ">Mon</Option>
            <Option key="Tuesday ">Tue</Option>
            <Option key="Wednesday ">Wed</Option>
            <Option key="Thursday ">Thu</Option>
            <Option key="Friday ">Fri</Option>
            <Option key="Saturday ">Sat</Option>
            <Option key="Sunday ">Sun</Option>
          </Select>
        </Form.Item>
        {this.state.type === "group" ? (
          <Form.Item label="Seats">
            <InputNumber
              min={0}
              onChange={this.handleSizeChange}
              value={this.state.groupSeats}
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
