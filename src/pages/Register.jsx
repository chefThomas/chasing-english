import React, { Component } from "react";
import { Tabs, Button, Table, Typography } from "antd";

const { Title } = Typography;
const { TabPane } = Tabs;
// const marginSm = { margin: "10px" };

export default class Admin extends Component {
  groupProgramsCols = [
    {
      title: "Title",
      dataIndex: "groupTitle",
      key: "groupTitle"
    },
    {
      title: "Start",
      dataIndex: "startDate",
      key: "startDate"
    },
    {
      title: "End",
      dataIndex: "endDate",
      key: "startDate"
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
      title: "Seats",
      dataIndex: "groupSeats",
      key: "groupSeats"
    },
    {
      title: "",
      key: "action",
      render: () => (
        <span>
          <Button type="primary">Reserve</Button>
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
      key: "startDate"
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
      title: "Seats",
      dataIndex: "groupSeats",
      key: "groupSeats"
    },
    {
      title: "",
      key: "action",
      render: () => (
        <span>
          <Button type="primary">Reserve</Button>
        </span>
      )
    }
  ];

  getGroupSessionData = () => {
    const groupPrograms = this.props.sessions.filter(program => {
      return program.type === "group";
    });

    return groupPrograms.map((program, index) => {
      return {
        key: index,
        groupTitle: program.groupTitle,
        startDate: program.startDate,
        endDate: program.endDate,
        meetingTime: program.meetingTime,
        meetingDay: program.meetingDay,
        groupSeats: program.groupSeats,
        type: program.type
      };
    });
  };

  getIndividualSessionData = () => {
    const indyPrograms = this.props.sessions.filter(program => {
      return program.type === "individual";
    });

    return indyPrograms.map((program, index) => {
      return {
        key: index,
        startDate: program.startDate,
        endDate: program.endDate,
        meetingTime: program.meetingTime,
        meetingDay: program.meetingDay,
        groupSeats: program.groupSeats,
        type: program.type
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
          <Title level={3}>Individual</Title>
          <Table
            dataSource={this.getIndividualSessionData()}
            columns={this.individualProgramsCols}
          />
          <Title level={3}>Group</Title>
          <Table
            dataSource={this.getGroupSessionData()}
            columns={this.groupProgramsCols}
          />
        </TabPane>
        <TabPane tab="My Schedule" key="2">
          <Title level={3}>Individual</Title>
          <Table
            dataSource={this.getIndividualSessionData()}
            columns={this.individualProgramsCols}
          />
          <Title level={3}>Group</Title>

          <Table
            dataSource={this.getGroupSessionData()}
            columns={this.groupProgramsCols}
          />
        </TabPane>
      </Tabs>
    );
  }
}
