import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import {
  Button,
  Collapse,
  Icon,
  Modal,
  Popconfirm,
  Table,
  Tabs,
  Tooltip,
  message,
} from 'antd';

import getCredentials from '../utilities/getCredentialsFromLocalStorage.js';
import setAuthHeader from '../utilities/setAuthHeader';

import AdminMessageList from '../components/AdminMessageList';
import ProgramForm from '../components/ProgramForm';
import PurchaseRecord from '../components/PurchaseRecord';
import Roster from '../components/Roster';
import StudentRecord from '../components/StudentRecord';
import UserForm from '../components/UserForm';

import '../stylesheets/css/main.css';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const URI_STUB =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://blooming-beach-67877.herokuapp.com';

class Admin extends Component {
  state = {
    programFormVisible: false,
    userFormVisible: false,
    rosterVisible: false,
    students: null,
    guardians: [],
    guardianPurchaseHistory: [],
    admins: [],
    loadingMessage: false,
    roster: [],
    rosterCourseTitle: null,
    showRoster: false,
    messages: [],
    showGuardianPurchases: false,
    showStudentRecord: false,
    studentRecord: [],
  };

  programCols = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Start',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Time',
      dataIndex: 'meetingTime',
      key: 'meetingTime',
    },
    {
      title: 'Duration (hrs)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Day',
      dataIndex: 'meetingDay',
      key: 'meetingDay',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Enrolled',
      dataIndex: 'enrolled',
      key: 'enrolled',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, { id, status }) => (
        <div
          style={{
            fontSize: '25px',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <Tooltip title={'view roster'}>
            <Icon type="team" onClick={() => this.handleRosterViewClick(id)} />
          </Tooltip>

          <Tooltip title={status === 'active' ? 'archive' : 'active'}>
            <Icon
              type="file-sync"
              onClick={() => this.props.toggleStatus(id, 'programs', status)}
            />
          </Tooltip>

          <Popconfirm
            title="Are you sure?"
            onConfirm={() => this.props.remove(id, 'programs')}
            onCancel={() => null}
            okText="Yes"
            cancelText="Cancel"
            placement="left"
            icon={<Icon size="large" type="question-circle-o" />}
          >
            <Tooltip title="delete">
              <Icon type="delete" style={{ color: 'red' }} />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  guardianCols = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Contact Method',
      dataIndex: 'contactMethod',
      key: 'contactMethod',
    },
    {
      title: 'Students',
      dataIndex: 'students',
      key: 'students',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, { id, status }) => (
        <div
          style={{
            fontSize: '25px',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <Tooltip title={'view purchases'}>
            <Icon
              type="read"
              onClick={() => this.handlePurchasesViewClick(id)}
            />
          </Tooltip>
          {/* <Popconfirm
            title="Are you sure?"
            onConfirm={() => this.confirmDelete(id, 'guardian')}
            onCancel={() => null}
            okText="Yes"
            cancelText="Cancel"
            placement="left"
            icon={<Icon size="large" type="question-circle-o" />}
          >
            <Tooltip title="delete">
              <Icon type="delete" style={{ color: 'red' }} />
            </Tooltip>
          </Popconfirm> */}
        </div>
      ),
    },
  ];

  adminCols = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Actions',
      key: 'action',
      render: (text, { id }) => (
        <div
          style={{
            fontSize: '25px',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => this.confirmDelete(id, 'admin')}
            onCancel={() => null}
            okText="Yes"
            cancelText="Cancel"
            placement="left"
            icon={<Icon size="large" type="question-circle-o" />}
          >
            <Tooltip title="delete">
              <Icon type="delete" style={{ color: 'red' }} />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  studentCols = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Guardian',
      dataIndex: 'guardian',
      key: 'guardian',
    },
    {
      title: 'Enrollment Record',
      key: 'action',
      render: (text, { id }) => (
        <div
          style={{
            fontSize: '25px',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <Tooltip title="course history">
            <Icon
              type="read"
              onClick={() => this.handleStudentRecordClick(id)}
            ></Icon>
          </Tooltip>
        </div>
      ),
    },
  ];

  // displayMessage = () => {
  //   message.success(`${type} deleted`);
  // };

  // event handlers
  setDeleteId = e => {
    const { id } = e.target;
    this.setState({ deleteId: id });
  };

  confirmDelete = (id, type) => {
    this.remove(id, type);
  };

  closeRoster = () => {
    this.setState({ showRoster: false });
  };

  handlePurchasesViewClick = id => {
    const { guardians } = this.state;

    console.log(guardians, id);
    // find guardian from state
    const { coursesPurchased } = guardians.find(el => el.id === id);
    console.log(coursesPurchased);

    this.setState({
      guardianPurchaseHistory: coursesPurchased,
      showGuardianPurchases: true,
    });
  };

  handleRosterViewClick = id => {
    const { roster, title } = this.props.programs.find(
      program => program.id === id
    );

    // add guardian name and email to each student in roster
    const updatedRoster = roster.map(student => {
      const guardian = this.state.guardians.find(el => {
        console.log(el.students);
        return el.students.includes(student.id);
      });
      console.log('#### guardian ####', guardian);

      return guardian ? { ...student, guardian } : student;
    });

    this.setState({ roster: updatedRoster, rosterCourseTitle: title });
    this.setState({ showRoster: true });
  };

  handleArchiveClick = (id, type, status) => {
    console.log('archive program id: ', id, 'type: ', type, 'status: ', status);
    this.props.modStatus(id, type, status);
  };

  toggleProgramFormVisibility = e => {
    this.setState({
      programFormVisible: !this.state.programFormVisible,
      formType: 'individual',
    });
  };

  toggleUserFormVisibility = () => {
    this.setState({
      userFormVisible: !this.state.userFormVisible,
    });
  };

  handleProgramFormHide = () => {
    this.setState({ programFormVisible: false });
  };

  handleStudentRecordClick = id => {
    console.log(id);
    const { courses } = this.state.students.find(el => el.id === id);

    console.log(courses);
    this.setState({ studentRecord: courses, showStudentRecord: true });
  };

  addAdmin = async adminData => {
    const config = setAuthHeader(this.props.userToken);
    console.log('add admin: ', adminData);

    try {
      const admin = { ...adminData, status: 'active' };

      const newAdmin = await axios.post(
        `${URI_STUB}/api/admins`,
        admin,
        config
      );
      this.setState(st => ({ admins: st.admins.concat({ ...newAdmin.data }) }));
    } catch (err) {
      console.log('add user err: ', err.message);
    }
  };

  remove = async (id, type) => {
    const config = setAuthHeader(this.props.userToken);

    const result = await axios.delete(`${URI_STUB}/api/${type}/${id}`, config);

    console.log(result.status);

    if (type === 'admin-messages') {
      type = 'messages';
    }
    console.log(type);

    if (result.status >= 200 && result.status < 300) {
      const filtered = this.state[`${type}`].filter(el => el.id !== id);

      console.log(filtered);

      if (type === 'admin-messages') {
        type = 'messages';
      }

      this.setState({ [`${type}`]: filtered });
      message.success(`${type} deleted`);
    }
  };

  // getAdminData = () => {
  //   return this.props.admins.map(admin => {
  //     return {
  //       key: admin.id,
  //       id: admin.id,
  //       name: admin.firstName + admin.lastName,
  //       email: admin.email,
  //     };
  //   });
  // };

  // getStudentListFromGuardian = students => {
  //   if (students) {
  //     return students.length > 0
  //       ? students.map(student => `${student.firstName} ${student.lastName}`)
  //       : [];
  //   } else {
  //     return [];
  //   }
  // };

  // getGuardianData = () => {
  //   if (this.props.guardians.length > 0) {
  //     return this.props.guardians.map(g => {
  //       const students = g['students'].reduce((acc, student) => {
  //         return acc + `${student.firstName} ${student.lastName} `;
  //       }, '');
  //       return {
  //         key: g.id,
  //         id: g.id,
  //         name: `${g.guardianFirstName} ${g.guardianLastName}`,
  //         email: g.guardianEmail,
  //         phone: g.phone,
  //         students,
  //         gmail: g.gmail,
  //         status: g.status,
  //         grade: g.grade,
  //         contactMethod: g.contactMethod,
  //         programsOfInterest: g.programsOfInterest,
  //       };
  //     });
  //   } else {
  //     return null;
  //   }
  // };

  getAdmins = () => {
    if (this.state.admins) {
      return this.state.admins.map(({ id, firstName, lastName, email }) => {
        return {
          key: id,
          id: id,
          name: `${firstName} ${lastName}`,
          email: email,
        };
      });
    }
    return;
  };

  getGuardians = () => {
    if (this.state.guardians) {
      return this.state.guardians.map(
        ({
          id,
          guardianFirstName,
          guardianLastName,
          guardianEmail,
          phone,
          contactMethod,
          students,
        }) => {
          const studentString = students.reduce(
            (accum, student) =>
              ` ${student.firstName}  ${student.lastName}` + accum,
            ''
          );
          return {
            key: id,
            id,
            name: `${guardianFirstName} ${guardianLastName}`,
            email: guardianEmail,
            phone,
            contactMethod,
            students: studentString,
          };
        }
      );
    }
    return;
  };

  getStudents = () => {
    if (this.state.students) {
      return this.state.students.map(
        ({ id, firstName, lastName, email, guardian }) => {
          return {
            key: id,
            id: id,
            name: `${firstName} ${lastName}`,
            email: email,
            guardian: `${guardian.guardianFirstName} ${guardian.guardianLastName}`,
          };
        }
      );
    }
    return;
  };

  formatMongoDate = date => {
    const dateMoment = moment(date);
    const dayNumber = dateMoment.weekday();
    const day = moment()
      .day(dayNumber)
      .format('ddd');
    return day;
  };

  getProgramData = (type, status) => {
    if (status === 'active') {
      return this.props.programs
        .filter(program => program.type === type && program.status === status)
        .map(program => {
          const meetingDay =
            program.type === 'intensive'
              ? this.formatMongoDate(program.dateBegin)
              : program.meetingDay;
          return {
            key: program.id,
            id: program.id,
            title: program.title,
            description: program.description,
            duration: program.duration,
            startDate: program.dateBegin,
            endDate: program.dateEnd,
            meetingTime: program.meetingTime,
            meetingDay,
            capacity: program.capacity,
            enrolled: program.enrolled,
            status: program.status,
            type: program.type,
            roster: program.roster,
          };
        });
    } else {
      return this.props.programs
        .filter(program => program.status === 'archive')
        .map(program => ({
          key: program.id,
          id: program.id,
          title: program.title,
          description: program.description,
          startDate: program.dateBegin,
          endDate: program.dateEnd,
          meetingTime: program.meetingTime,
          meetingDay: program.meetingDay,
          capacity: program.capacity,
          enrolled: program.enrolled,
          status: program.status,
          type: program.type,
          duration: program.duration,
        }));
    }
  };

  // count = (arr, status, type) => {
  //   if (type) {
  //     return arr.filter(el =>
  //       status === 'archive'
  //         ? el.status === 'archive'
  //         : el.status === status && el.type === type
  //     ).length;
  //   }

  //   return arr.filter(el =>
  //     status === 'archive' ? el.status === 'archive' : el.status === 'active'
  //   ).length;
  // };

  changeMessageReadStatus = async (Id, read) => {
    this.setState({ loadingMessage: true });
    const config = setAuthHeader(localStorage.getItem('userToken'));
    const status = read === 'read' ? 'unread' : 'read';
    const result = await axios.put(
      `${URI_STUB}/api/admin-messages/${Id}`,
      {
        status,
      },
      config
    );

    if (result.status !== 200) {
      // handle UI error
    } else {
      // update state
      console.log(read);
      console.log(status);
      const { messages } = this.state;

      const updatedMessages = messages.map(el =>
        el.id === Id ? { ...el, status } : el
      );

      console.log(updatedMessages);

      this.setState({ messages: updatedMessages, loadingMessage: false });
    }
  };

  async componentDidMount() {
    // relogin on refresh
    const { user } = this.props;
    const credentials = getCredentials();
    console.log(user, credentials);
    if (!user && credentials) {
      this.props.login(credentials);
    }

    const config = setAuthHeader(localStorage.getItem('userToken'));
    const students = await axios.get(`${URI_STUB}/api/students`, config);
    const guardians = await axios.get(`${URI_STUB}/api/guardians`, config);
    const admins = await axios.get(`${URI_STUB}/api/admins`, config);
    const messages = await axios.get(`${URI_STUB}/api/admin-messages`, config);

    this.setState({
      students: students.data,
      guardians: guardians.data,
      admins: admins.data,
      messages: messages.data,
    });
  }

  render() {
    return (
      <>
        <PurchaseRecord
          showGuardianPurchases={this.state.showGuardianPurchases}
          closeGuardianPurchases={() =>
            this.setState({ showGuardianPurchases: false })
          }
          // guardians={this.state.guardians}
          guardianPurchaseHistory={this.state.guardianPurchaseHistory}
        />
        <StudentRecord
          showStudentRecord={this.state.showStudentRecord}
          closeStudentRecord={() => this.setState({ showStudentRecord: false })}
          studentRecord={this.state.studentRecord}
          className="StudentRecord"
        />
        <Roster
          roster={this.state.roster}
          showRoster={this.state.showRoster}
          closeRoster={this.closeRoster}
          rosterCourseTitle={this.state.rosterCourseTitle}
          className="StudentRecord"
        />
        {this.props.user && this.props.user.userType === 'admin' ? (
          <div>
            <Tabs type="card">
              <TabPane tab="Programs" key="2">
                <Button
                  type="primary"
                  icon="file-add"
                  style={{ margin: '15px' }}
                  size="large"
                  onClick={this.toggleProgramFormVisibility}
                >
                  Create Program
                </Button>
                <Collapse>
                  <Panel header="Individual Coaching" key="individual">
                    <Table
                      bordered
                      dataSource={this.getProgramData('individual', 'active')}
                      columns={this.programCols}
                    />
                  </Panel>
                  <Panel header="Group" key="group">
                    <Table
                      size="medium"
                      bordered
                      dataSource={this.getProgramData('group', 'active')}
                      columns={this.programCols}
                    />
                  </Panel>
                  <Panel header="Single-day Workshop" key="intensive">
                    <Table
                      size="medium"
                      bordered
                      dataSource={this.getProgramData('intensive', 'active')}
                      columns={this.programCols}
                    />
                  </Panel>
                  <Panel header="Archive" key="archive">
                    <Table
                      bordered
                      dataSource={this.getProgramData('', 'archive')}
                      columns={this.programCols}
                    />
                  </Panel>
                </Collapse>
              </TabPane>
              <TabPane tab="Users" key="3">
                <Button
                  type="primary"
                  icon="file-add"
                  style={{ margin: '15px' }}
                  size="large"
                  onClick={this.toggleUserFormVisibility}
                >
                  Create User
                </Button>
                <Collapse>
                  <Panel header="Admin" key="admin">
                    <Table
                      size="medium"
                      bordered
                      dataSource={this.getAdmins('active')}
                      columns={this.adminCols}
                    />
                  </Panel>
                  <Panel header="Student" key="student">
                    <Table
                      size="medium"
                      bordered
                      dataSource={this.getStudents('active')}
                      columns={this.studentCols}
                    />
                  </Panel>
                  <Panel header="Guardians" key="guardian">
                    <Table
                      size="medium"
                      bordered
                      dataSource={this.getGuardians('active')}
                      columns={this.guardianCols}
                    />
                  </Panel>
                </Collapse>
              </TabPane>
              <TabPane tab="Messages" key="4">
                <AdminMessageList
                  messages={this.state.messages}
                  changeMessageReadStatus={this.changeMessageReadStatus}
                  remove={this.remove}
                  loadingMessage={this.state.loadingMessage}
                />
              </TabPane>
            </Tabs>
            <Modal
              title="Create Program"
              visible={this.state.programFormVisible}
              onOk={this.toggleProgramFormVisibility}
              onCancel={this.toggleProgramFormVisibility}
            >
              <ProgramForm addProgram={this.props.addProgram} />
            </Modal>
            <Modal
              title="Create User"
              visible={this.state.userFormVisible}
              onOk={this.toggleUserFormVisibility}
              onCancel={this.toggleUserFormVisibility}
            >
              <UserForm
                addAdmin={this.addAdmin}
                addGuardian={this.props.addGuardian}
                addStudent={this.props.addStudent}
                guardians={this.props.guardians}
              />
            </Modal>
          </div>
        ) : null}
      </>
    );
  }
}

export default withRouter(Admin);
