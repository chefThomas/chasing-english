import React, { Component } from "react";
import { Tabs, Button, Table, Popconfirm, message, Icon } from "antd";
import ProgramForm from "../components/ProgramForm";

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
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => this.confirmDelete(record.id)}
            onCancel={() => null}
            okText="Yes"
            cancelText="Cancel"
            placement="left"
            icon={<Icon type="question-circle-o" style={{ color: "red" }} />}
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
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
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => this.confirmDelete(record.id)}
            onCancel={() => null}
            okText="Yes"
            cancelText="Cancel"
            placement="left"
            icon={<Icon type="question-circle-o" style={{ color: "red" }} />}
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </span>
      )
    }
  ];

  setDeleteId = e => {
    const { id } = e.target;
    console.log("set delete id", id);
    this.setState({ deleteId: id });
  };

  confirmDelete = id => {
    // console.log(e);
    this.props.removeSession(id);
    message.success("Program deleted");
  };

  getGroupSessionData = () => {
    const groupPrograms = this.props.sessions.filter(program => {
      return program.type === "group";
    });

    return groupPrograms.map(program => {
      return {
        key: program.id,
        id: program.id,
        groupTitle: program.groupTitle,
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
        id: program.id,
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
    this.getIndividualSessionData();
    this.getGroupSessionData();
  }

  render() {
    return (
      <Tabs type="card">
        <TabPane tab="Add Program" key="1">
          <ProgramForm addSession={this.props.addSession} />
        </TabPane>
        <TabPane tab="View/Edit Programs" key="2">
          {/* <Title level={3}>Individual</Title> */}
          <Table
            size="medium"
            bordered
            title={() => "Individual"}
            dataSource={this.getIndividualSessionData()}
            columns={this.individualProgramsCols}
          />
          {/* <Title level={3}>Group</Title> */}
          <Table
            size="medium"
            bordered
            title={() => "Group"}
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
