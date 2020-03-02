import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { injectStripe } from 'react-stripe-elements';

import axios from 'axios';
import moment from 'moment';

import { Drawer, Alert } from 'antd';

import Navbar from '../components/Navbar';
import AntLogin from '../components/AntLogin';
import Home from './Home';
import Catalog from './Catalog';
import About from './About';
import Admin from './Admin';
import Success from './Success';
import Cancel from './Cancel';

import formatMongoDate from '../utilities/formatMongoDate';

import '../stylesheets/css/main.css';
import GuardianRegistration from './GuardianRegistration';

// const URI_STUB = 'https://blooming-beach-67877.herokuapp.com';
const URI_STUB =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://blooming-beach-67877.herokuapp.com';

class Root extends Component {
  state = {
    admins: [],
    alertMessage: '',
    alertVisible: false,
    checkoutSession: null,
    fetching: false,
    guardians: [],
    loggedInUsername: null,
    loggedInUserCustomerId: null,
    loggedInUserType: null,
    programs: [],
    registrationEvent: false,
    showLogin: false,
    students: [],
    userToken: null,
    fullCourseModalMessage: '',
    fullCourseModalVisible: false,
    removeCoursesFromCart: [],
  };

  handleAlertClose = () => {
    this.setState({ alertVisible: false, alertMessage: '' });
  };

  // UI
  hideLogin = () => {
    this.setState({ showLogin: false });
  };

  showLogin = () => {
    this.setState({ showLogin: true });
  };

  handleCloseCart = () => {};

  handleFullCourseDialog = message => {
    // displays dialog on Catalog page when customer tries to checkout courses that were filled after they logged in

    this.setState({
      fullCourseModalMessage: message,
      fullCourseModalVisible: true,
    });
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
      userToken: null,
      loggedInUsername: null,
      loggedInUserType: null,
    });

    localStorage.clear();
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
      this.setState({ alertVisible: true, alertMessage: 'Unsuccessful login' });
    } else {
      console.log(user);
      const email = user.email ? user.email : user.guardianEmail;
      const result = await axios.post(`${URI_STUB}/login`, {
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
          loggedInUserCustomerId: result.data.customerId,
          registrationEvent: false,
          redirectToCatalog: false,
        });
        // set token, name, and customerId to localStorage
        localStorage.setItem('userToken', result.data.token);
        localStorage.setItem('loggedInUsername', result.data.name);
        localStorage.setItem('loggedInUserCustomerId', result.data.customerId);
        localStorage.setItem('loggedInUserType', result.data.userType);

        this.hideLogin();
      } else {
        this.setState({ loginMessage: 'Unsuccessful login' });
      }
    }
  };

  purchase = async courses => {
    const checkout = await axios.post(`${URI_STUB}/shop`, {
      customer: this.state.loggedInUserCustomerId,
      lineItems: courses,
    });

    console.log('##### CHECKOUT SESSION RETURNED FROM STRIPE #####', checkout);
    // make Stripe object available from Window (see App.js)
    const stripe = this.props.stripe;

    await stripe.redirectToCheckout({
      sessionId: checkout.data.id,
    });
  };

  register = async guardianData => {
    // register customer (guardian )and their student. user data from register form.
    try {
      console.log(guardianData);
      const newGuardian = await axios.post(
        `${URI_STUB}/api/guardians`,
        guardianData
      );

      console.log('new guardian ', newGuardian);
      // post new student
      const studentId = newGuardian.data.students[0];

      // retrieve student data
      const newStudent = await axios.get(
        `${URI_STUB}/api/students/${studentId}`
      );
      const guardianWithStudentName = await axios.get(
        `${URI_STUB}/api/guardians/${newGuardian.data.id}`
      );
      axios.post('https:/api.stripe.com/v1/customers');
      console.log(guardianWithStudentName);
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

      const newAdmin = await axios.post(`${URI_STUB}/api/admins`, admin);
      this.setState(st => ({ admins: st.admins.concat({ ...newAdmin.data }) }));
    } catch (err) {
      console.log('add user err: ', err.message);
    }
  };

  fullCourseModalClose = () => {
    this.setState({
      fullCourseModalVisible: false,
      fullCourseModalMessage: '',
    });
  };

  addStudent = async studentData => {
    // create new student
    const student = await axios.post(`${URI_STUB}/api/programs`, studentData);
    console.log(student);
    // PUT guardian/id
  };

  // generate Stripe Checkout
  checkout = async lineItems => {
    this.setState({ fetching: true });

    console.log(lineItems);
    // check enrollment for each course in cart.
    const programsArr = lineItems.map(
      async program => await axios.get(`${URI_STUB}/api/programs/${program.id}`)
    );

    const programs = await Promise.all(programsArr);

    console.log('ROOT :200, programs ', programs);

    // array of full programs where number enrolled >= capacity
    const fullCourses = programs.filter(({ data }) => {
      return data.enrolled >= data.capacity;
    });

    console.log(fullCourses);

    if (fullCourses.length > 0) {
      let message = fullCourses.reduce((accum, course) => {
        return `${course.data.title} is no longer available` + accum;
      }, '');
      this.setState({ fetching: false });

      // remove from cart and call handleCheckout
      // make id array of full courses to filter them out of line items
      const fullCourseIds = fullCourses.map(course => course.data.id);

      console.log(fullCourseIds);
      const availableCourses = lineItems.filter(item => {
        return !fullCourseIds.includes(item.id);
      });
      // handle message display on catalog page
      this.handleFullCourseDialog(message);
      console.log(message);
      console.log(availableCourses);

      if (availableCourses.length > 0) {
        this.purchase(availableCourses);
      } else {
        this.handleCloseCart();
      }
    } else {
      this.purchase(lineItems);
    }
  };

  addProgram = program => {
    axios
      .post(`${URI_STUB}/api/programs`, program)
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

  handleMessage = msg => {};
  remove = (id, type) => {
    console.log(id, type);
    axios.delete(`${URI_STUB}/api/${type}/${id}`).then(res => {
      const filtered = this.state[`${type}`].filter(el => el.id !== id);
      console.log(filtered);
      this.setState({ [type]: filtered });
    });
  };

  toggleStatus = (recordId, type, status) => {
    const record = this.state[type].find(record => record.id === recordId);

    const updatedStatus = status === 'active' ? 'archive' : 'active';

    console.log({ ...record, status: updatedStatus });

    axios
      .put(`${URI_STUB}/api/${type}/${recordId}`, {
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
    // check env
    console.log(
      '################ PROCESS.ENV.NODE_ENV #################',
      process.env.NODE_ENV
    );
    // load programs and users
    try {
      axios
        .get(`${URI_STUB}/api/programs`)
        .then(res => {
          const dateBegin = formatMongoDate(res.data.dateBegin);
          const dateEnd = formatMongoDate(res.data.dateEnd);

          // format date
          const programs = res.data.map(program => {
            return { ...program, dateBegin, dateEnd };
          });
          console.log('##### PROGRAMS #####', programs);
          this.setState({ programs });
        })
        .catch(err => console.log('no programs retrieved: ', err));
    } catch (err) {
      console.log(err);
    }

    try {
      const guardians = await axios.get(`${URI_STUB}/api/guardians`);
      const admins = await axios.get(`${URI_STUB}/api/admins`);
      const students = await axios.get(`${URI_STUB}/api/students`);
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

    // Use local storage to keep users logged in on component remount
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      const loggedInUsername = localStorage.getItem('loggedInUsername');
      const loggedInUserCustomerId = localStorage.getItem(
        'loggedInUserCustomerId'
      );
      const loggedInUserType = localStorage.getItem('loggedInUserType');

      this.setState({
        userToken,
        loggedInUsername,
        loggedInUserType,
        loggedInUserCustomerId,
      });

      // save to state
    } else {
      console.log('no user stored');
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
          zIndex={3000}
        >
          {this.state.alertVisible ? (
            <Alert
              message={this.state.alertMessage}
              type="error"
              showIcon
              closable
              onClose={this.handleAlertClose}
              handle
            />
          ) : null}
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
              <Catalog
                {...routeProps}
                programs={this.state.programs}
                userToken={this.state.userToken}
                checkout={this.checkout}
                fetching={this.state.fetching}
                fullCourseModalVisible={this.state.fullCourseModalVisible}
                fullCourseModalMessage={this.state.fullCourseModalMessage}
                fullCourseModalClose={this.props.fullCourseModalClose}
              />
            )}
          />
          <Route
            exact
            path="/about"
            render={routeProps => <About {...routeProps} />}
          />
          <Route
            exact
            path="/success"
            render={routeProps => <Success {...routeProps} />}
          />
          <Route
            exact
            path="/cancel"
            render={routeProps => <Cancel {...routeProps} />}
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

const stripeWrapper = injectStripe(withRouter(Root));
export default stripeWrapper;
