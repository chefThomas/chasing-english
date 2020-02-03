import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import Navbar from '../components/Navbar';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import SideNav from '../components/SideNav';
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
export default class Root extends Component {
  state = {
    showSignup: false,
    showLogin: false,
    showSideNav: false,
    programs: [],
    guardians: [],
    admins: [],
    students: [],
  };

  // UI
  toggleSignup = () => {
    this.setState({
      showSignup: !this.state.showSignup,
      showLogin: false,
      showSideNav: false,
    });
  };

  toggleLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin,
      showSignup: false,
      showSideNav: false,
    });
  };

  toggleSideNav = () => {
    this.setState({
      showSideNav: !this.state.showSideNav,
      showSignup: false,
      showLogin: false,
    });
  };

  closeSideNav = () => {
    this.setState({
      showSideNav: false,
    });
  };

  // MISC
  formatMongoDate = mongoDate => moment(mongoDate).format('MM-DD-YYYY');

  // api calls
  // register: adds guardian with student
  // addAdmin: add admin
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
      console.log(studentId);
      const newStudent = await axios.get(
        `${PRE_API_URI}/api/students/${studentId}`
      );
      // if guardian post successful, student and set state
      console.log(newStudent);
      this.setState(st => ({
        guardians: st.guardians.concat(newGuardian.data),
        students: st.students.concat(newStudent.data),
      }));

      console.log(this.state);
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
        const dateBegin = formatMongoDate(res.data.dateBegin);
        const dateEnd = formatMongoDate(res.data.dateEnd);
        console.log(dateBegin, dateEnd);
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
        '############## COMPONENT MOUNT USERS ###############',
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
      console.log(err);
    }
  };

  render() {
    return (
      <div className="Root">
        <Navbar
          {...this.state}
          toggleSignup={this.toggleSignup}
          toggleLogin={this.toggleLogin}
          toggleSideNav={this.toggleSideNav}
          showSideNav={this.state.showSideNav}
        />
        <SignupForm
          toggle={this.showSignup}
          className={this.state.showSignup ? 'SignupForm' : 'offscreen'}
        />
        <LoginForm
          toggle={this.toggleLogin}
          toggleSignup={this.toggleSignup}
          className={this.state.showLogin ? 'LoginForm' : 'offscreen-login'}
        />
        <SideNav
          closeSideNav={this.closeSideNav}
          className={this.state.showSideNav ? 'SideNav' : 'offscreen-sidenav'}
        />
        <Switch>
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
              <GuardianRegistration {...routeProps} register={this.register} />
            )}
          />
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
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
