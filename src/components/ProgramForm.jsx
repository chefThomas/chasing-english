import React, { Component } from 'react';
import moment from 'moment';
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

const { TextArea } = Input;
const { Option } = Select;

class ProgramForm extends Component {
  state = {
    title: '',
    description: '',
    startDate: null,
    dateBegin: '',
    endDate: null,
    dateEnd: '',
    meetingTime: moment('00:00:00', 'HH:mm'),
    meetingDay: [],
    capacity: 1,
    enrolled: 0,
    type: null,
    status: 'active',
    duration: 0,
    price: 0,
  };

  initialState = {
    title: '',
    description: '',
    startDate: null,
    dateBegin: '',
    endDate: null,
    dateEnd: '',
    meetingTime: moment('00:00:00', 'HH:mm'),
    meetingDay: [],
    capacity: 1,
    enrolled: 0,
    type: null,
    status: 'active',
    duration: 0,
    price: 0,
  };

  handleTypeChange = (e) => {
    const { value } = e.target;
    let title = null;
    if (value === 'individual') {
      title = 'Individual Coaching';
    }

    this.setState({ type: value, title });
  };
  handleSizeChange = (value) => {
    console.log(value);
    this.setState({ capacity: value });
  };

  handleTitleChange = (e) => {
    const { value } = e.target;
    this.setState({ title: value });
  };

  handleDescriptionChange = (e) => {
    const { value } = e.target;
    this.setState({ description: value });
  };

  handleGroupStartChange = (date, dateBegin) => {
    this.setState({ startDate: date, dateBegin });
  };

  handleGroupEndChange = (date, dateEnd) => {
    this.setState({ endDate: date, dateEnd });
  };

  handleGroupTimeChange = (time, timeString) => {
    console.log('timeString: ', timeString);
    this.setState({ meetingTime: timeString });
  };

  handleDayChange = (value) => {
    console.log(value);
    this.setState({ meetingDay: value });
  };

  handleDurationChange = (value) => {
    console.log(value);
    this.setState({ duration: value });
  };

  handlePriceChange = (value) => {
    console.log(value);
    this.setState({ price: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      dateBegin,
      meetingTime,
      meetingDay,
      capacity,
      enrolled,
      type,
      duration,
      price,
    } = this.state;

    console.log(this.props.programFormMode);

    const dateEnd =
      this.state.type === 'intensive' ? dateBegin : this.state.dateEnd;

    this.props.addProgram({
      title,
      description,
      dateBegin,
      dateEnd,
      meetingTime,
      meetingDay,
      capacity,
      enrolled,
      type,
      duration,
      price,
      status: 'active',
    });
    this.props.closeForm();
    this.setState(this.initialState);
    return;
  };

  render() {
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item>
          <Radio.Group value={this.state.type} onChange={this.handleTypeChange}>
            <Radio.Button value="individual">Individual</Radio.Button>
            <Radio.Button value="group">Group</Radio.Button>
            <Radio.Button value="intensive">Single-day Workshop</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Title">
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
        {this.state.type === 'group' || this.state.type === 'intensive' ? (
          <Form.Item label="Description">
            <TextArea
              onChange={this.handleDescriptionChange}
              value={this.state.description}
              rows={4}
            />
          </Form.Item>
        ) : null}
        <Form.Item
          label={this.state.type === 'intensive' ? 'Date' : 'Date Range'}
        >
          <DatePicker
            style={{ marginBottom: '5px' }}
            format="YYYY-MM-DD"
            placeholder="Start"
            onChange={this.handleGroupStartChange}
            value={this.state.startDate}
          />
          <br></br>
          {this.state.type !== 'intensive' ? (
            <DatePicker
              format="YYYY-MM-DD"
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
            defaultOpenValue={moment('00:00:00', 'HH:mm')}
            onChange={this.handleGroupTimeChange}
          />
        </Form.Item>
        <Form.Item label="Duration (hours)">
          <InputNumber
            min={0}
            value={this.state.duration}
            onChange={this.handleDurationChange}
          />
        </Form.Item>

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
        {this.state.type === 'group' || this.state.type === 'intensive' ? (
          <Form.Item label="Seats">
            <InputNumber
              min={0}
              onChange={this.handleSizeChange}
              value={this.state.capacity}
            />
          </Form.Item>
        ) : null}
        <Form.Item label="Price">
          <InputNumber
            min={0}
            onChange={this.handlePriceChange}
            value={this.state.price}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ProgramForm;
