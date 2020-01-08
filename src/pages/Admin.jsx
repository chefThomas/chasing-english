import React, { Component } from "react";
import {
  Button,
  Collapse,
  Icon,
  message,
  Modal,
  Popconfirm,
  Table,
  Tabs
} from "antd";
import ProgramForm from "../components/ProgramForm";
import UserForm from "../components/UserForm";

const { TabPane } = Tabs;
const { Panel } = Collapse;
// const marginSm = { margin: "10px" };

export default class Admin extends Component {
  state = {
    programFormVisible: false,
    userFormVisible: false
  };

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

  userCols = [
    {
      title: "First",
      dataIndex: "firstName",
      key: "startDate"
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
      title: "Courses",
      dataIndex: "courses",
      key: "courses"
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

  getActiveUserData = status => {
    const users = this.props.users.filter(user => {
      return user.status === "active";
    });

    return users.map(user => {
      return {
        key: user.id,
        id: user.id,
        firstName: user.firstName,
        status: user.status,
        type: user.type,
        courses: user.courses
      };
    });
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

  showIndyModal = e => {
    console.log("show indy modal clicked", e);
    this.setState({
      programFormVisible: !this.state.programFormVisible,
      formType: "individual"
    });
  };

  showUserModal = e => {
    console.log("show user modal clicked", e);
    this.setState({
      userFormVisible: !this.state.userFormVisible
    });
  };

  handleProgramFormHide = () => {
    this.setState({ programFormVisible: false });
  };

  handleUserFormHide = () => {
    this.setState({ userFormVisible: false });
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
              onClick={this.showIndyModal}
            >
              Create Program
            </Button>
            <Collapse>
              <Panel header="Individual" key="individual">
                <Table
                  bordered
                  dataSource={this.getIndividualSessionData()}
                  columns={this.individualProgramsCols}
                />
              </Panel>
              <Panel header="Group" key="group">
                <Table
                  size="medium"
                  bordered
                  dataSource={this.getGroupSessionData()}
                  columns={this.groupProgramsCols}
                />
              </Panel>
              <Panel header="Archive" key="archive">
                <Table
                  bordered
                  dataSource={this.getIndividualSessionData()}
                  columns={this.userCols}
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
              onClick={this.showUserModal}
            >
              Create User
            </Button>
            <Collapse>
              <Panel header="Active" key="active">
                <Table
                  size="medium"
                  bordered
                  dataSource={this.getActiveUserData()}
                  columns={this.userCols}
                />
              </Panel>
              <Panel header="Archive" key="archive">
                <Table
                  size="medium"
                  bordered
                  // dataSource={this.getUserData("archive")}
                  columns={this.userCols}
                />
              </Panel>
            </Collapse>
          </TabPane>
        </Tabs>
        <Modal
          title="Create Program"
          visible={this.state.programFormVisible}
          onOk={this.handleProgramFormHide}
          onCancel={this.handleProgramFormHide}
        >
          <ProgramForm addSession={this.props.addSession} />
        </Modal>
        <Modal
          title="Create User"
          visible={this.state.userFormVisible}
          onOk={this.handleUserFormHide}
          onCancel={this.handleUserFormHide}
        >
          <UserForm addUser={this.props.addUser} />
        </Modal>
      </div>
    );
  }
}
