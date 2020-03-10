import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { injectStripe } from 'react-stripe-elements';

import axios from 'axios';
import moment from 'moment';

import { Drawer, Alert, message } from 'antd';

import Navbar from '../components/Navbar';
import AntLogin from '../components/AntLogin';
import Home from './Home';
import Catalog from './Catalog';
import About from './About';
import Admin from './Admin';
import Success from './Success';
import Cancel from './Cancel';

import formatMongoDate from '../utilities/formatMongoDate';
import setAuthHeader from '../utilities/setAuthHeader';

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
    students: [],
    guardians: [],
    alertMessage: '',
    alertVisible: false,
    user: null,
    username: null,
    userType: null,
    checkoutSession: null,
    fetching: false,
    programs: [],
    registrationEvent: false,
    showLogin: false,
    userToken: null,
    fullCourseDialogMessages: [],
    fullCourseDialogVisible: false,
    fullCourseIds: [],
    showSideNav: false,
    userId: null,
    adminError: null,
  };

  handleAlertClose = () => {
    this.setState({ alertVisible: false, alertMessage: '' });
  };

  // UI
  hideLogin = () => {
    this.setState({ showLogin: false });
  };

  handleCloseCart = () => {};

  handleFullCourseDialog = message => {
    // displays dialog on Catalog page when customer tries to checkout courses that were filled after they logged in
    this.setState({
      fullCourseDialogVisible: true,
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
  // register: adds guardian + student
  //

  logout = () => {
    this.setState({
      userToken: null,
      user: null,
      username: null,
      userType: null,
      userId: null,
    });
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
  };

  login = async ({ email, password }) => {
    console.log(email, password);

    // if (!user) {
    //   // display UI error: are you sure that's the correct user?
    //   this.setState({ alertVisible: true, alertMessage: 'Unsuccessful login' });
    // } else {
    //   console.log(user);

    try {
      const {
        data,
        data: { user },
      } = await axios.post(`${URI_STUB}/login`, {
        email,
        password,
      });

      if (!user) {
        this.setState({
          alertVisible: true,
          alertMessage: 'Unsuccessful login',
        });
        return;
      }

      // change guardian name props to match other user types
      user.firstName = user.firstName ? user.firstName : user.guardianFirstName;
      user.lastName = user.lastName ? user.lastName : user.guardianLastName;

      if (user) {
        this.setState({
          userToken: data.token,
          user,
          username: user.firstName,
          userType: user.userType,
          registrationEvent: false,
          redirectToCatalog: false,
        });
        // set token, name, and customerId to localStorage
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('username', user.firstName);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userType', user.userType);

        this.hideLogin();
        // redirect to catalog
        this.props.history.push('/catalog');
      } else {
        this.setState({ loginMessage: 'Unsuccessful login' });
      }
    } catch (err) {
      this.setState({ alertVisible: true, alertMessage: 'Unsuccessful login' });
      console.log(err);
    }
  };

  purchase = async courses => {
    const checkout = await axios.post(`${URI_STUB}/shop`, {
      customer: this.state.user.customerId,
      lineItems: courses,
    });

    // make Stripe object available from Window (see App.js)
    const stripe = this.props.stripe;

    await stripe.redirectToCheckout({
      sessionId: checkout.data.id,
    });
  };

  addToWaitlist = async courseId => {
    // get program
    const program = await axios.get(`${URI_STUB}/api/programs/${courseId}`);
    console.log(program.data);
    // get user
    const user = await axios.get(
      `${URI_STUB}/api/guardians/${this.state.user.customerId}`
    );

    // // check if user is on waitlist
    // if (program.data.waitlist.includes(user.data.id)) {
    //   message.info("It looks like you're already on the waitlist");
    //   return;
    // }

    // add mongo user id to program waitlist
    const updatedProgram = await axios.put(
      `${URI_STUB}/api/programs/${courseId}`,
      {
        waitlist: program.data.waitlist.concat(user.data.id),
      }
    );

    console.log(updatedProgram);
    // add program id to user waitlist
    const updatedUser = await axios.put(
      `${URI_STUB}/api/guardians/${user.data.id}`,
      {
        waitlist: user.data.waitlist.concat(program.data.id),
      }
    );

    //TODO update state with updated programs
    console.log(
      'updated user and program: ',
      updatedUser.data,
      updatedProgram.data
    );
    const updatedGuardians = this.state.guardians.map(guardian => {
      return guardian.id === updatedUser.data.id ? updatedUser.data : guardian;
    });

    const updatedPrograms = this.state.programs.map(program => {
      return program.id === updatedProgram.data.id
        ? updatedProgram.data
        : program;
    });

    this.setState({
      ...this.state,
      programs: updatedPrograms,
      guardians: updatedGuardians,
    });
  };

  register = async guardianData => {
    console.log(guardianData);

    const newGuardian = await axios.post(
      `${URI_STUB}/api/guardians`,
      guardianData
    );

    console.log(newGuardian);

    if (newGuardian.data.error) {
      // display error message on admin page
      this.setState({ adminError: newGuardian.data.message });
      return;
    }

    // // post new student
    const studentId = newGuardian.data.students[0];

    // // retrieve student data
    const newStudent = await axios.get(`${URI_STUB}/api/students/${studentId}`);

    const guardianWithStudentName = await axios.get(
      `${URI_STUB}/api/guardians/${newGuardian.data.id}`
    );

    // // get student name to add to guardian students list
    this.setState(prevState => ({
      guardians: [...prevState.guardians, guardianWithStudentName.data],
      students: [...prevState.students, newStudent.data],
      registrationEvent: true,
    }));
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

  fullCourseDialogClose = () => {
    this.setState({
      fullCourseDialogVisible: false,
      fullCourseDialogMessage: '',
    });
  };

  addStudent = async studentData => {
    // create new student
    const student = await axios.post(`${URI_STUB}/api/programs`, studentData);
    console.log(student);
    // PUT guardian/id
  };

  checkForFullCourses = async items => {
    // fetching icon in checkout button
    this.setState({ fetching: true });

    // retrieve purchased programs from db
    const programsArr = items.map(
      async program => await axios.get(`${URI_STUB}/api/programs/${program.id}`)
    );

    const programs = await Promise.all(programsArr);

    // array of full programs where number enrolled >= capacity
    const fullCourses = programs.filter(({ data }) => {
      return data.enrolled >= data.capacity;
    });

    console.log(fullCourses);

    if (fullCourses.length) {
      this.setState({ fetching: false });
      const fullCourseIds = fullCourses.map(course => course.data.id);

      this.setState({ fullCourseIds });

      let fullCourseDialogMessages = fullCourses.map(course => {
        return `${course.data.title} is no longer available and has been removed from the cart`;
      });
      this.setState({ fullCourseDialogMessages });
      this.setState({ fullCourseDialogVisible: true });
    }
  };

  // generate Stripe Checkout
  checkout = async lineItems => {
    console.log(lineItems);
    // check enrollment for each course in cart.
    this.purchase(lineItems);
  };

  clearFullCourseIds = () => {
    this.setState({ fullCourseIds: [] });
  };

  addProgram = async program => {
    console.log(this.state.userToken);
    const config = setAuthHeader(this.state.userToken);
    console.log(config);

    const result = await axios.post(
      `${URI_STUB}/api/programs`,
      program,
      config
    );

    const dateBegin = this.formatMongoDate(result.data.dateBegin, 'date');
    const dateEnd = this.formatMongoDate(result.data.dateEnd, 'date');
    const day = this.formatMongoDate(result.data.dateBegin, 'day');
    console.log(dateBegin, dateEnd, day);
    console.log(result.data);
    this.setState(prevState => ({
      programs: prevState.programs.concat({
        ...result.data,
        dateBegin,
        dateEnd,
      }),
    }));
  };

  handleMessage = msg => {
    console.log(msg);
  };
  remove = async (id, type) => {
    const config = setAuthHeader(this.state.userToken);
    const result = await axios.delete(`${URI_STUB}/api/${type}/${id}`, config);

    console.log(result.status);

    if (result.status === 200) {
      const filtered = this.state[`${type}`].filter(el => el.id !== id);
      this.setState({ [type]: filtered });
      this.handleMessage('program deleted');
    }
  };

  closeSideNav = () => {
    this.setState({ showSideNav: false });
  };

  openSideNav = () => {
    this.setState({ showSideNav: true });
  };

  showLogin = () => {
    this.setState({ showLogin: true });
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

  getLoggedInUserPrograms = () => {
    const { programs } = this.state.guardians.find(
      guardian => this.state.loggedInUserCustomerId == guardian.customerId
    );

    return programs;
  };

  componentDidMount = async () => {
    // load programs and users
    try {
      const results = await axios.get(`${URI_STUB}/api/programs`);
      // map formatted dates onto program
      const programs = results.data.map(program => {
        const dateBegin = formatMongoDate(program.dateBegin);
        const dateEnd = formatMongoDate(program.dateEnd);
        return { ...program, dateBegin, dateEnd };
      });

      console.log('##### PROGRAMS #####', programs);
      this.setState({ programs });
    } catch (err) {
      console.log(
        'there was an error retrieving programs while mounting Root',
        err
      );
    }

    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      const username = localStorage.getItem('username');
      const userId = localStorage.getItem('userId');
      const userType = localStorage.getItem('userType');

      this.setState({
        userToken,
        username,
        userId,
        userType,
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
          showSideNav={this.state.showSideNav}
          openSideNav={this.openSideNav}
          closeSideNav={this.closeSideNav}
          showLogin={this.showLogin}
          username={this.state.username}
          userType={this.state.userType}
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
                purchase={this.purchase}
                fetching={this.state.fetching}
                fullCourseDialogVisible={this.state.fullCourseDialogVisible}
                fullCourseDialogMessages={this.state.fullCourseDialogMessages}
                fullCourseDialogClose={this.props.fullCourseDialogClose}
                checkForFullCourses={this.checkForFullCourses}
                clearFullCourseIds={this.clearFullCourseIds}
                loggedInUserCustomerId={this.state.loggedInUserCustomerId}
                loggedInUserStudents={this.state.loggedInUserStudents}
                addToWaitlist={this.addToWaitlist}
                loggedInUserCoursesPurchased={
                  this.state.loggedInUserCoursesPurchased
                }
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
                adminPageErrorMessage={this.state.adminError}
              />
            )}
          />
          {this.state.userType === 'admin' ? (
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
                  userType={this.state.userType}
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
