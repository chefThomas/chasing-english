import React, { Component } from "react";
import { Tabs, Button, Table, Typography } from "antd";

const { Title } = Typography;
const { TabPane } = Tabs;

const Style = {
  padLeftReg: { paddingLeft: "10px" }
};

export default class Register extends Component {
  groupProgramsCols = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Start",
      dataIndex: "startDate",
      key: "startDate"
    },
    {
      title: "End",
      dataIndex: "endDate",
      key: "endDate"
    },
    {
      title: "Time",
      dataIndex: "meetingTime",
      key: "meetingTime"
    },
    {
      title: "Day",
      dataIndex: "meetingDay",
      key: "meetingDay"
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity"
    },
    {
      title: "Enrolled",
      dataIndex: "enrolled",
      key: "enrolled"
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <span>
          {record.capacity === record.enrolled ? (
            <Button onClick={this.handleWaitlist}>Waitlist</Button>
          ) : (
            <Button onClick={this.handleWaitlist} type="primary">
              Register
            </Button>
          )}
        </span>
      )
    }
  ];

  individualProgramsCols = [
    {
      title: "Start",
      dataIndex: "startDate",
      key: "startDate"
    },
    {
      title: "End",
      dataIndex: "endDate",
      key: "endDate"
    },
    {
      title: "Time",
      dataIndex: "meetingTime",
      key: "meetingTime"
    },
    {
      title: "Day",
      dataIndex: "meetingDay",
      key: "meetingDay"
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity"
    },
    {
      title: "Enrolled",
      dataIndex: "enrolled",
      key: "enrolled"
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <span>
          {record.enrolled === record.capacity ? (
            <Button onClick={this.handleAddToWaitlist}>Add to Waitlist</Button>
          ) : (
            <Button type="primary">Register</Button>
          )}
        </span>
      )
    }
  ];

  getGroupSessionData = () => {
    const groupPrograms = this.props.sessions.filter(program => {
      return program.type === "group";
    });

    return groupPrograms.map(program => {
      return {
        key: program.id,
        title: program.title,
        startDate: program.startDate,
        endDate: program.endDate,
        meetingTime: program.meetingTime,
        meetingDay: program.meetingDay,
        capacity: program.capacity,
        enrolled: program.enrolled
      };
    });
  };

  getIndividualSessionData = () => {
    const indyPrograms = this.props.sessions.filter(program => {
      return program.type === "individual";
    });

    return indyPrograms.map(program => {
      return {
        key: program.id,
        startDate: program.startDate,
        endDate: program.endDate,
        meetingTime: program.meetingTime,
        meetingDay: program.meetingDay,
        capacity: program.capacity,
        enrolled: program.enrolled
      };
    });
  };

  componentDidMount() {
    //retrieve program data on page load
    this.getIndividualSessionData();
    this.getGroupSessionData();
  }

  render() {
    return (
      <Tabs type="card">
        <TabPane tab="Courses" key="1">
          <Title style={Style.padLeftReg} level={3}>
            Individual
          </Title>
          <Table
            dataSource={this.getIndividualSessionData()}
            columns={this.individualProgramsCols}
          />
          <Title style={Style.padLeftReg} className="Table_title" level={3}>
            Group
          </Title>
          <Table
            dataSource={this.getGroupSessionData()}
            columns={this.groupProgramsCols}
          />
        </TabPane>
        <TabPane tab="My Schedule" key="2">
          <Title style={Style.padLeftReg} level={3}>
            Individual
          </Title>
          <Table
            dataSource={this.getIndividualSessionData()}
            columns={this.individualProgramsCols}
          />
          <Title style={Style.padLeftReg} className="Table_title" level={3}>
            Group
          </Title>

          <Table
            dataSource={this.getGroupSessionData()}
            columns={this.groupProgramsCols}
          />
        </TabPane>
      </Tabs>
    );
  }
}
