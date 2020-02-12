import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { Drawer, Result } from 'antd';

import Navbar from '../components/Navbar';
import AntLogin from '../components/AntLogin';
import Home from './Home';
import Catalog from './Catalog';
import About from './About';
import Admin from './Admin';

import formatMongoDate from '../utilities/formatMongoDate';

import '../stylesheets/css/main.css';
import GuardianRegistration from './GuardianRegistration';

const PRE_API_URI = 'http://localhost:5000';
// process.env.NODE_ENV === 'development'
//   ? 'https://blooming-beach-67877.herokuapp.com'
//   : 'http://localhost:5000';
class Root extends Component {
  state = {
    programs: [],
    guardians: [],
    admins: [],
    students: [],
    registrationEvent: false,
    userToken: null,
    loggedInUsername: null,
    loggedInUserType: null,
    showLogin: false,
  };

  // UI
  hideLogin = () => {
    this.setState({ showLogin: false });
  };

  showLogin = () => {
    this.setState({ showLogin: true });
  };

  // MISC
  formatMongoDate = (date, type) => {
    const dateMoment = moment(date);
    if (type === 'date') {
      return dateMoment.format('MM-DD-YYYY');
    } else {
      const dayNumber = dateMoment.weekday();
      const day = moment()
        .day(dayNumber)
        .format('ddd');
      return day;
    }
  };

  // api calls
  // register: adds guardian with student
  // addAdmin: add admin

  logout = () => {
    this.setState({
      loggedInUsername: null,
      userToken: null,
      loggedInUsername: null,
      loggedInUserType: null,
    });
  };

  login = async ({ email, password }) => {
    console.log(email, password);
    const users = [
      ...this.state.guardians,
      ...this.state.students,
      ...this.state.admins,
    ];

    console.log(users);
    // find user by email
    const user = users.find(user => {
      return user['email'] === email || user['guardianEmail'] === email;
    });

    if (!user) {
      // display UI error: are you sure that's the correct user?
      console.log('user not found in state: display UI error');
    } else {
      console.log(user);
      const email = user.email ? user.email : user.guardianEmail;
      const result = await axios.post(`${PRE_API_URI}/login`, {
        email,
        password,
        userType: user.userType,
      });

      console.log(result);
      if (result) {
        this.setState({
          userToken: result.data.token,
          loggedInUsername: result.data.name,
          loggedInUserType: result.data.userType,
          registrationEvent: false,
          redirectToCatalog: false,
        });

        this.hideLogin();
      } else {
        // UI display unsuccessful login
      }
    }
  };
  register = async guardianData => {
    // posts guardian and their first student. returns student id which is made to make a get request. data from guardian POST and student GET are used to set state.
    try {
      console.log(guardianData);
      const newGuardian = await axios.post(
        `${PRE_API_URI}/api/guardians`,
        guardianData
      );

      console.log('new guardian ', newGuardian);
      // post new student
      const studentId = newGuardian.data.students[0];

      // retrieve student data
      const newStudent = await axios.get(
        `${PRE_API_URI}/api/students/${studentId}`
      );
      const guardianWithStudentName = await axios.get(
        `${PRE_API_URI}/api/guardians/${newGuardian.data.id}`
      );
      // if guardian post successful, student and set state
      console.log('new student', newStudent);
      // get student name to add to guardian students list
      this.setState(prevState => ({
        guardians: [...prevState.guardians, guardianWithStudentName.data],
        students: [...prevState.students, newStudent.data],
        registrationEvent: true,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  addAdmin = async adminData => {
    console.log('add admin: ', adminData);

    try {
      const admin = { ...adminData, status: 'active' };

      const newAdmin = await axios.post(`${PRE_API_URI}/api/admins`, admin);
      this.setState(st => ({ admins: st.admins.concat({ ...newAdmin.data }) }));
    } catch (err) {
      console.log('add user err: ', err.message);
    }
  };

  addStudent = async studentData => {
    // create new student
    const student = await axios.post(
      `${PRE_API_URI}/api/programs`,
      studentData
    );
    console.log(student);
    // PUT guardian/id
  };

  addProgram = program => {
    axios
      .post(`${PRE_API_URI}/api/programs`, program)
      .then(res => {
        const dateBegin = formatMongoDate(res.data.dateBegin, 'date');
        const dateEnd = formatMongoDate(res.data.dateEnd, 'date');
        const day = this.formatMongoDate(res.data.dateBegin, 'day');
        console.log(dateBegin, dateEnd, day);
        console.log(res.data);
        this.setState(st => ({
          programs: st.programs.concat({ ...res.data, dateBegin, dateEnd }),
        }));
      })
      .catch(err => console.log('add sesh err: ', err.message));
  };

  remove = (id, type) => {
    axios.delete(`${PRE_API_URI}/api/${type}s/${id}`).then(res => {
      const filtered = this.state[`${type}s`].filter(el => el.id !== id);
      console.log(filtered);
      this.setState({ [`${type}s`]: filtered });
    });
  };

  toggleStatus = (recordId, type, status) => {
    const record = this.state[type].find(record => record.id === recordId);

    const updatedStatus = status === 'active' ? 'archive' : 'active';

    console.log({ ...record, status: updatedStatus });

    axios
      .put(`${PRE_API_URI}/api/${type}/${recordId}`, {
        ...record,
        status: updatedStatus,
      })
      .then(({ data }) => {
        console.log(data);
        if (type === 'programs') {
          const dateBegin = formatMongoDate(data.dateBegin);
          const dateEnd = formatMongoDate(data.dateEnd);
          console.log(dateBegin, dateEnd);
          data = { ...data, dateBegin, dateEnd };
          console.log(data);
        }
        const filterState = this.state[type].filter(
          record => record.id !== recordId
        );

        this.setState({ [type]: filterState.concat(data) });
      });
  };

  componentDidMount = async () => {
    axios
      .get(`${PRE_API_URI}/api/programs`)
      .then(res => {
        const dateBegin = formatMongoDate(res.data.dateBegin);
        const dateEnd = formatMongoDate(res.data.dateEnd);

        // format date
        const programs = res.data.map(program => {
          return { ...program, dateBegin, dateEnd };
        });
        this.setState({ programs });
      })
      .catch(err => console.log('oh no, no programs retrieved: ', err));

    try {
      const guardians = await axios.get(`${PRE_API_URI}/api/guardians`);
      const admins = await axios.get(`${PRE_API_URI}/api/admins`);
      const students = await axios.get(`${PRE_API_URI}/api/students`);
      console.log(
        '############## ROOT COMPONENT MOUNT USERS ###############',
        'guardians: ',
        guardians.data,
        'admins: ',
        admins.data,
        'students: ',
        students.data
      );

      this.setState({
        guardians: guardians.data,
        admins: admins.data,
        students: students.data,
      });
    } catch (err) {
      console.log('############ ROOT COMPONENT MOUNT USER ERROR ', err);
    }
  };

  render() {
    return (
      <div className="Root">
        <Drawer
          title="Login"
          width={360}
          onClose={this.hideLogin}
          visible={this.state.showLogin}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <AntLogin login={this.login} />
        </Drawer>
        <Navbar
          showLogin={this.showLogin}
          loggedInUsername={this.state.loggedInUsername}
          loggedInUserType={this.state.loggedInUserType}
          logout={this.logout}
        />
        <Switch>
          {this.state.redirectToCatalog ? (
            <Redirect from="/guardian-registration" to="/catalog" />
          ) : null}
          <Route
            exact
            path="/"
            render={routeProps => <Home {...this.state} {...routeProps} />}
          />
          <Route
            exact
            path="/catalog"
            render={routeProps => (
              <Catalog {...routeProps} programs={this.state.programs} />
            )}
          />
          <Route
            exact
            path="/about"
            render={routeProps => <About {...routeProps} />}
          />
          <Route
            exact
            path="/guardian-registration"
            render={routeProps => (
              <GuardianRegistration
                {...routeProps}
                register={this.register}
                login={this.login}
                registrationEvent={this.state.registrationEvent}
              />
            )}
          />
          {this.state.loggedInUserType === 'admin' ? (
            <Route
              exact
              path="/admin"
              render={routeProps => (
                <Admin
                  {...routeProps}
                  addAdmin={this.addAdmin}
                  addGuardian={this.register}
                  guardians={this.state.guardians}
                  programs={this.state.programs}
                  students={this.state.students}
                  admins={this.state.admins}
                  addProgram={this.addProgram}
                  toggleStatus={this.toggleStatus}
                  remove={this.remove}
                  loggedInUserType={this.state.loggedInUserType}
                />
              )}
            />
          ) : null}
        </Switch>
      </div>
    );
  }
}

export default withRouter(Root);
