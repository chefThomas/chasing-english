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

class TimeRelatedForm extends Component {
  state = {
    groupTitle: "",
    startDate: moment().format("MM-DD-YYYY"),
    endDate: moment().format("MM-DD-YYYY"),
    meetingTime: moment().format("h:mm a"),
    meetingDay: [],
    capacity: 1,
    enrolled: 0,
    type: null
  };

  initialState = {
    groupTitle: "",
    startDate: moment().format("MM-DD-YYYY"),
    endDate: moment().format("MM-DD-YYYY"),
    meetingTime: moment().format("h:mm a"),
    meetingDay: [],
    capacity: 1,
    enrolled: 0,
    type: null
  };

  handleTypeChange = e => {
    const { value } = e.target;
    this.setState({ type: value });
  };
  handleSizeChange = value => {
    console.log(value);
    this.setState({ capacity: value });
  };

  handleGroupTitleChange = e => {
    const { value } = e.target;
    this.setState({ groupTitle: value });
  };

  handleGroupStartChange = (date, dateString) => {
    console.log("date start: ", dateString);
    this.setState({ startDate: dateString });
  };

  handleGroupEndChange = (date, dateString) => {
    this.setState({ endDate: dateString });
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
    console.log(e.target);

    this.props.addSession(this.state);
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
            value={moment(this.state.startDate)}
          />
          <br></br>
          <DatePicker
            format="MM-DD-YYYY"
            placeholder="End Date"
            onChange={this.handleGroupEndChange}
            value={moment(this.state.endDate)}
          />
        </Form.Item>
        <Form.Item label="Meeting Time">
          <TimePicker
            minuteStep={15}
            format="h:mm a"
            use12Hours
            onChange={this.handleGroupTimeChange}
          />
        </Form.Item>
        <Form.Item required={true} label="Meeting Day(s)">
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
          <Button type="primary" htmlType="submit" onClick={this.props.remove}>
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
