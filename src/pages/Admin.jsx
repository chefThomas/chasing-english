import React, { Component } from "react";
import {
  Button,
  Collapse,
  Icon,
  message,
  Modal,
  Popconfirm,
  Table,
  Tabs,
  Tooltip
} from "antd";
import ProgramForm from "../components/ProgramForm";
import UserForm from "../components/UserForm";
import "../stylesheets/css/main.css";

const { TabPane } = Tabs;
const { Panel } = Collapse;
// const marginSm = { margin: "10px" };
export default class Admin extends Component {
  state = {
    programFormVisible: false,
    userFormVisible: false
  };

  programCols = [
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
      title: "Actions",
      key: "action",
      render: (text, { id, status }) => (
        <div
          style={{
            fontSize: "25px",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          <Tooltip title={"view/edit roster"}>
            <Icon type="team" onClick={() => this.handleRosterViewClick(id)} />
          </Tooltip>

          <Tooltip title={status === "active" ? "archive" : "activate"}>
            <Icon
              type="file-sync"
              onClick={() => this.handleArchiveClick(id, "sessions", status)}
            />
          </Tooltip>

          <Popconfirm
            title="Are you sure?"
            onConfirm={() => this.confirmDelete(id, "sessions")}
            onCancel={() => null}
            okText="Yes"
            cancelText="Cancel"
            placement="left"
            icon={<Icon size="large" type="question-circle-o" />}
          >
            <Tooltip title="delete">
              <Icon type="delete" style={{ color: "red" }} />
            </Tooltip>
          </Popconfirm>
        </div>
      )
    }
  ];

  userCols = [
    {
      title: "First",
      dataIndex: "firstName",
      key: "firstName"
    },
    {
      title: "Last",
      dataIndex: "lastName",
      key: "lastName"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Actions",
      key: "action",
      render: (text, { id, status }) => (
        <div
          style={{
            fontSize: "25px",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          <Tooltip title={"view records"}>
            <Icon type="read" onClick={() => this.handleRosterViewClick(id)} />
          </Tooltip>

          <Tooltip title={status === "active" ? "archive" : "activate"}>
            <Icon
              type="file-sync"
              onClick={() => this.handleArchiveClick(id, "users", status)}
            />
          </Tooltip>

          <Popconfirm
            title="Are you sure?"
            onConfirm={() => this.confirmDelete(id, "users")}
            onCancel={() => null}
            okText="Yes"
            cancelText="Cancel"
            placement="left"
            icon={<Icon size="large" type="question-circle-o" />}
          >
            <Tooltip title="delete">
              <Icon type="delete" style={{ color: "red" }} />
            </Tooltip>
          </Popconfirm>
        </div>
      )
    }
  ];

  // event handlers
  setDeleteId = e => {
    const { id } = e.target;
    this.setState({ deleteId: id });
  };

  confirmDelete = (id, type) => {
    this.props.remove(id, type);

    const itemType = type === "users" ? "User" : "Program";
    message.success(`${itemType} deleted`);
  };

  handleRosterViewClick = id => {
    console.log("view roster program id: ", id);
  };
  handleArchiveClick = (id, type, status) => {
    console.log("archive program id: ", id, "type: ", type, "status: ", status);
    this.props.modStatus(id, type, status);
  };

  toggleProgramFormVisibility = e => {
    console.log(e);
    this.setState({
      programFormVisible: !this.state.programFormVisible,
      formType: "individual"
    });
  };

  toggleUserFormVisibility = () => {
    this.setState({
      userFormVisible: !this.state.userFormVisible
    });
  };

  handleProgramFormHide = () => {
    this.setState({ programFormVisible: false });
  };

  // populate tables
  getUserData = status => {
    const users = this.props.users.filter(user => {
      return user.status === status;
    });

    return users.map(user => {
      return {
        key: user.id,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        courses: user.courses,
        guardianEmail: user.guardianEmail,
        guardianPhoneNumber: user.guardianPhoneNumber,
        status: user.status
      };
    });
  };

  getSessionData = (type, status) => {
    if (status === "active") {
      return this.props.sessions
        .filter(program => program.type === type && program.status === status)
        .map(program => ({
          key: program.id,
          id: program.id,
          title: program.title,
          startDate: program.startDate,
          endDate: program.endDate,
          meetingTime: program.meetingTime,
          meetingDay: program.meetingDay,
          capacity: program.capacity,
          enrolled: program.enrolled,
          status: program.status
        }));
    } else {
      return this.props.sessions
        .filter(program => program.status === "archive")
        .map(program => ({
          key: program.id,
          id: program.id,
          title: program.title,
          startDate: program.startDate,
          endDate: program.endDate,
          meetingTime: program.meetingTime,
          meetingDay: program.meetingDay,
          capacity: program.capacity,
          enrolled: program.enrolled,
          status: program.status
        }));
    }
  };

  count = (arr, status, type) => {
    if (type) {
      return arr.filter(el =>
        status === "archive"
          ? el.status === "archive"
          : el.status === status && el.type === type
      ).length;
    }

    return arr.filter(el =>
      status === "archive" ? el.status === "archive" : el.status === "active"
    ).length;
  };

  render() {
    return (
      <div>
        <Tabs type="card">
          <TabPane tab="Programs" key="2">
            <Button
              type="primary"
              icon="file-add"
              style={{ margin: "15px" }}
              size="large"
              onClick={this.toggleProgramFormVisibility}
            >
              Create Program
            </Button>
            <Collapse>
              <Panel
                header={`Individual (${this.count(
                  this.props.sessions,
                  "active",
                  "individual"
                )})`}
                key="individual"
              >
                <Table
                  bordered
                  dataSource={this.getSessionData("individual", "active")}
                  columns={this.programCols}
                />
              </Panel>
              <Panel
                header={`Group (${this.count(
                  this.props.sessions,
                  "active",
                  "group"
                )})`}
                key="group"
              >
                <Table
                  size="medium"
                  bordered
                  dataSource={this.getSessionData("group", "active")}
                  columns={this.programCols}
                />
              </Panel>
              <Panel
                header={`Archive (${this.count(
                  this.props.sessions,
                  "archive"
                )})`}
                key="archive"
              >
                <Table
                  bordered
                  dataSource={this.getSessionData("", "archive")}
                  columns={this.programCols}
                />
              </Panel>
            </Collapse>
          </TabPane>
          <TabPane tab="Users" key="3">
            <Button
              type="primary"
              icon="file-add"
              style={{ margin: "15px" }}
              size="large"
              onClick={this.toggleUserFormVisibility}
            >
              Create User
            </Button>
            <Collapse>
              <Panel
                header={`Active (${this.count(this.props.users, "active")})`}
                key="active"
              >
                <Table
                  size="medium"
                  bordered
                  dataSource={this.getUserData("active")}
                  columns={this.userCols}
                />
              </Panel>
              <Panel
                header={`Archive (${this.count(this.props.users, "archive")})`}
                key="archive"
              >
                <Table
                  size="medium"
                  bordered
                  dataSource={this.getUserData("archive")}
                  columns={this.userCols}
                />
              </Panel>
            </Collapse>
          </TabPane>
        </Tabs>
        <Modal
          title="Create Program"
          visible={this.state.programFormVisible}
          onOk={this.toggleProgramFormVisibility}
          onCancel={this.toggleProgramFormVisibility}
        >
          <ProgramForm addSession={this.props.addSession} />
        </Modal>
        <Modal
          title="Create User"
          visible={this.state.userFormVisible}
          onOk={this.toggleUserFormVisibility}
          onCancel={this.toggleUserFormVisibility}
        >
          <UserForm addUser={this.props.addUser} />
        </Modal>
      </div>
    );
  }
}
