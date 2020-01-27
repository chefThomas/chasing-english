import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import SideNav from '../components/SideNav';
import Home from './Home';
import Catalog from './Catalog';
import About from './About';
import Admin from './Admin';

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

  // api calls
  register = async guardianData => {
    console.log(guardianData);
    const newGuardian = await axios.post(
      `${PRE_API_URI}/api/guardians`,
      guardianData
    );
    console.log('new guardian ', newGuardian);
  };

  // addUser = user => {
  //   console.log('add user: ', user);

  //   const newUser = { ...user, courses: [], status: 'active' };
  //   axios
  //     .post(`${PRE_API_URI}/api/users`, newUser)
  //     .then(res => {
  //       console.log(res);
  //       this.setState(st => ({ users: st.users.concat({ ...res.data }) }));
  //     })
  //     .catch(err => console.log('add user err: ', err.message));
  // };

  addProgram = program => {
    axios
      .post(`${PRE_API_URI}/api/programs`, program)
      .then(res => {
        console.log(res.data);
        this.setState(st => ({ programs: st.programs.concat(res.data) }));
      })
      .catch(err => console.log('add sesh err: ', err.message));
  };

  remove = (id, type) => {
    axios.delete(`${PRE_API_URI}/api/${type}/${id}`).then(res => {
      const filtered = this.state[type].filter(el => el.id !== id);
      this.setState({ [type]: filtered });
    });
  };

  toggleActivity = (recordId, type, status) => {
    const record = this.state[type].find(record => record.id === recordId);

    const updatedStatus = status === 'active' ? 'archive' : 'active';

    axios
      .put(`${PRE_API_URI}/api/${type}/${recordId}`, {
        ...record,
        status: updatedStatus,
      })
      .then(({ data }) => {
        const filterState = this.state[type].filter(
          record => record.id !== recordId
        );

        this.setState({ [type]: filterState.concat(data) });
      });
  };

  componentDidMount() {
    axios
      .get(`${PRE_API_URI}/api/programs`)
      .then(res => {
        this.setState(st => ({
          programs: st.programs.concat(res.data),
        }));
      })
      .catch(err => console.log('oh no, no programs retrieved: ', err));

    axios
      .get(`${PRE_API_URI}/api/users`)
      .then(res => {
        this.setState(st => ({
          users: st.users.concat(res.data),
        }));
      })
      .catch(err => console.log(err));
  }

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
                addSession={this.addSession}
                programs={this.state.programs}
                users={this.state.users}
                remove={this.remove}
                addUser={this.addUser}
                modStatus={this.toggleActivity}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
