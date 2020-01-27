import React, { Component } from 'react';
import {
  Form,
  DatePicker,
  TimePicker,
  Button,
  Input,
  InputNumber,
  Select,
  Radio,
} from 'antd';
// import moment from "moment";

const { Option } = Select;

class TimeRelatedForm extends Component {
  state = {
    title: '',
    startDate: null,
    startDateString: null,
    endDate: null,
    endDateString: null,
    meetingTime: null,
    meetingDay: [],
    capacity: 1,
    enrolled: 0,
    type: null,
    status: 'active',
  };

  initialState = {
    title: '',
    startDate: null,
    endDate: null,
    meetingTime: null,
    meetingDay: [],
    capacity: 1,
    enrolled: 0,
    type: this.state.type,
    status: 'active',
  };

  handleTypeChange = e => {
    const { value } = e.target;
    let title = null;
    if (value === 'individual') {
      title = 'Ind. Sessions';
    }

    if (value === 'intensive') {
      title = 'One-day Intensive';
    }

    this.setState({ type: value, title });
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
    console.log('date string: ', dateString);
    console.log('date obj: ', date);
    this.setState({ startDate: date });
  };

  handleGroupEndChange = (date, dateString) => {
    this.setState({ endDate: date });
  };

  handleGroupTimeChange = (time, timeString) => {
    console.log('timeString: ', timeString);
    this.setState({ meetingTime: timeString });
  };

  handleDayChange = value => {
    console.log(value);
    this.setState({ meetingDay: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { startDate, endDate } = this.state;

    const dateString = {
      startDate: startDate ? startDate.format('MM/DD/YY') : null,
      endDate: endDate ? endDate.format('MM/DD/YY') : null,
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
            <Radio.Button value="intensive">One-day Intensive</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          style={this.state.type !== 'group' ? { display: 'none' } : null}
          label="Title"
        >
          <Input
            style={{ width: '40%' }}
            label="Title"
            placeholder="course title"
            id="title"
            allowClear
            onChange={this.handleTitleChange}
            value={this.state.title}
          />
        </Form.Item>
        <Form.Item
          label={this.state.type === 'intensive' ? 'Date' : 'Date Range'}
        >
          <DatePicker
            style={{ marginBottom: '5px' }}
            format="MM-DD-YYYY"
            placeholder="Start"
            onChange={this.handleGroupStartChange}
            value={this.state.startDate}
          />
          <br></br>
          {this.state.type !== 'intensive' ? (
            <DatePicker
              format="MM-DD-YYYY"
              placeholder="End"
              onChange={this.handleGroupEndChange}
              value={this.state.endDate}
            />
          ) : null}
        </Form.Item>
        <Form.Item label="Meeting Time">
          <TimePicker
            format="h:mm a"
            use12Hours
            onChange={this.handleGroupTimeChange}
          />
        </Form.Item>
        {this.state.type !== 'intensive' ? (
          <Form.Item label="Meeting Day(s)">
            <Select
              mode="multiple"
              style={{ width: '40%' }}
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
        ) : null}
        {this.state.type === 'group' ? (
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

export default TimeRelatedForm;
