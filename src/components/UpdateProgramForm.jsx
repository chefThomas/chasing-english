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

class UpdateProgramForm extends Component {
  state = {
    ...this.props.programToUpdate,
    startDate: moment(this.props.programToUpdate.dateBegin),
    endDate: moment(this.props.programToUpdate.dateEnd),
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
    this.setState({ meetingTime: timeString });
  };

  handleDayChange = (value) => {
    this.setState({ meetingDay: value });
  };

  handleDurationChange = (value) => {
    this.setState({ duration: value });
  };

  handlePriceChange = (value) => {
    this.setState({ price: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.updateProgram(this.state.id, this.state);
    // this.props.closeUpdateForm();
    // this.setState(this.initialState);
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
            // defaultOpenValue={moment('00:00:00', 'HH:mm')}
            onChange={this.handleGroupTimeChange}
            value={moment(this.state.meetingTime, 'HH:mm a')}
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

export default UpdateProgramForm;
