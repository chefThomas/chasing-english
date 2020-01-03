import React, { Component } from "react";
import { Tabs, Button, Table, Typography } from "antd";
import ProgramForm from "../components/ProgramForm";

const { Title } = Typography;
const { TabPane } = Tabs;
const marginSm = { margin: "10px" };

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
          <Button type="danger">Delete</Button>
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
          <Button type="danger">Delete</Button>
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
        <TabPane style={marginSm} tab="Add Program" key="1">
          <ProgramForm addSession={this.props.addSession} />
        </TabPane>
        <TabPane tab="View/Edit Programs" key="2">
          <Title style={marginSm} level={3}>
            Individual
          </Title>
          <Table
            dataSource={this.getIndividualSessionData()}
            columns={this.individualProgramsCols}
          />
          <Title style={marginSm} level={3}>
            Group
          </Title>
          <Table
            dataSource={this.getGroupSessionData()}
            columns={this.groupProgramsCols}
          />
        </TabPane>
        <TabPane tab="Info Requests" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    );
  }
}
