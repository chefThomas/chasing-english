import React, { Component } from 'react';
import {
  Button,
  Collapse,
  Icon,
  message,
  Modal,
  Popconfirm,
  Table,
  Tabs,
  Tooltip,
  Result,
} from 'antd';
import ProgramForm from '../components/ProgramForm';
import UserForm from '../components/UserForm';
import '../stylesheets/css/main.css';

const { TabPane } = Tabs;
const { Panel } = Collapse;
// const marginSm = { margin: "10px" };
export default class Admin extends Component {
  state = {
    programFormVisible: false,
    userFormVisible: false,
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
          <Tooltip title={'view/edit roster'}>
            <Icon type="team" onClick={() => this.handleRosterViewClick(id)} />
          </Tooltip>

          <Tooltip title={status === 'active' ? 'archive' : 'activate'}>
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
          {/* <Popconfirm
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
          </Popconfirm> */}
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
          <Tooltip title="course history">
            <Icon type="read"></Icon>
          </Tooltip>
          {/* <Popconfirm
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
            </Tooltip> */}
          {/* </Popconfirm> */}
        </div>
      ),
    },
  ];
  // event handlers
  setDeleteId = e => {
    const { id } = e.target;
    this.setState({ deleteId: id });
  };

  confirmDelete = (id, type) => {
    this.props.remove(id, type);

    message.success(`${type} deleted`);
  };

  handleRosterViewClick = id => {
    console.log('view roster program id: ', id);
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

  getAdminData = () => {
    return this.props.admins.map(admin => {
      return {
        key: admin.id,
        id: admin.id,
        name: admin.firstName + admin.lastName,
        email: admin.email,
      };
    });
  };

  // getStudentListFromGuardian = students => {
  //   if (students) {
  //     return students.length > 0
  //       ? students.map(student => `${student.firstName} ${student.lastName}`)
  //       : [];
  //   } else {
  //     return [];
  //   }
  // };

  getGuardianData = () => {
    console.log(this.props.guardians.length);
    if (this.props.guardians.length > 0) {
      return this.props.guardians.map(g => {
        const students = g['students'].reduce((acc, student) => {
          return acc + `${student.firstName} ${student.lastName} `;
        }, '');
        return {
          key: g.id,
          id: g.id,
          name: `${g.guardianFirstName} ${g.guardianLastName}`,
          email: g.guardianEmail,
          phone: g.phone,
          students,
          gmail: g.gmail,
          status: g.status,
          grade: g.grade,
          contactMethod: g.contactMethod,
          programsOfInterest: g.programsOfInterest,
        };
      });
    } else {
      return null;
    }
  };

  getStudentData = () => {
    return this.props.students.map(s => {
      console.log(s.guardian);
      return {
        key: s.id,
        id: s.id,
        name: `${s.firstName} ${s.lastName}`,
        email: s.email,
        courses: s.courses,
        students: s.students,
        gmail: s.gmail,
        status: s.status,
        guardian: `${s.guardian.guardianFirstName} ${s.guardian.guardianLastName}`,
        grade: s.grade,
      };
    });
  };

  getProgramData = (type, status) => {
    if (status === 'active') {
      return this.props.programs
        .filter(program => program.type === type && program.status === status)
        .map(program => ({
          key: program.id,
          id: program.id,
          title: program.title,
          startDate: program.dateBegin,
          endDate: program.dateEnd,
          meetingTime: program.meetingTime,
          meetingDay: program.meetingDay,
          capacity: program.capacity,
          enrolled: program.enrolled,
          status: program.status,
          type: program.type,
        }));
    } else {
      return this.props.programs
        .filter(program => program.status === 'archive')
        .map(program => ({
          key: program.id,
          id: program.id,
          title: program.title,
          startDate: program.dateBegin,
          endDate: program.dateEnd,
          meetingTime: program.meetingTime,
          meetingDay: program.meetingDay,
          capacity: program.capacity,
          enrolled: program.enrolled,
          status: program.status,
          type: program.type,
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

  render() {
    return (
      <>
        {this.props.loggedInUserType === 'admin' ? (
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
                  <Panel header="One-day Intensive" key="intensive">
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
                      dataSource={this.getAdminData()}
                      columns={this.adminCols}
                    />
                  </Panel>
                  <Panel header="Student" key="student">
                    <Table
                      size="medium"
                      bordered
                      dataSource={this.getStudentData()}
                      columns={this.studentCols}
                    />
                  </Panel>
                  <Panel header="Guardians" key="guardian">
                    <Table
                      size="medium"
                      bordered
                      dataSource={this.getGuardianData('active')}
                      columns={this.guardianCols}
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
              <ProgramForm addProgram={this.props.addProgram} />
            </Modal>
            <Modal
              title="Create User"
              visible={this.state.userFormVisible}
              onOk={this.toggleUserFormVisibility}
              onCancel={this.toggleUserFormVisibility}
            >
              <UserForm
                addAdmin={this.props.addAdmin}
                addGuardian={this.props.addGuardian}
                addStudent={this.props.addStudent}
                guardians={this.props.guardians}
              />
            </Modal>
          </div>
        ) : (
          <Result
            style={{
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
            status="success"
            title="Welcome to Chasing English!"
            subTitle="You are now registered and ready to enroll your student. Please login to view all course offerings."
          />
        )}
      </>
    );
  }
}
