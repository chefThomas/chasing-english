import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

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
import makeTimestampString from '../utilities/makeTimestampString';

import '../stylesheets/css/main.css';
import GuardianRegistration from './GuardianRegistration';

const URI_STUB =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://www.chasingenglish.com';

class Root extends Component {
  state = {
    adminError: null,
    checkoutSession: null,
    errorMessage: null,

    // UI
    fetching: false,

    // Catalog UI
    fullCourseDialogMessages: [],
    fullCourseDialogVisible: false,
    catalogMessage: null,

    // Admin
    guardians: [],
    programs: [],
    showLogin: false,
    registrationEvent: false,
    showSideNav: false,

    // user
    guardianWaitlist: [],
    user: null,
    userId: null,
    username: null,
    admins: [],
    // Catalog UI
    guardianStudents: [],
    // Navbar/Admin page UI
    userToken: null,
  };

  handleAlertClose = () => {
    this.setState({ alertMessage: '', alertVisible: false });
  };

  getTokenFromLocalStorage = () => {
    const userToken = localStorage.getItem('userToken');
    const username = localStorage.getItem('username');
    this.setState({ userToken, username });
  };
  // UI
  hideLogin = () => {
    this.setState({ showLogin: false });
  };

  handleCloseCart = () => {};

  handleFullCourseDialog = (message) => {
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
      const day = moment().day(dayNumber).format('ddd');
      return day;
    }
  };

  logout = () => {
    this.setState({
      userToken: null,
      user: null,
      username: null,
      userType: null,
      userId: null,
    });
    localStorage.removeItem('userToken');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('username');
  };

  login = async ({ email, password }) => {
    email = email.toLowerCase();

    try {
      const { data } = await axios.post(`${URI_STUB}/login`, {
        email,
        password,
      });

      if (!data) {
        this.setState({
          alertVisible: true,
          alertMessage: 'Unsuccessful login',
        });
        return;
      }

      // change guardian name props to match other user types
      data.user.firstName = data.user.firstName
        ? data.user.firstName
        : data.user.guardianFirstName;
      data.user.lastName = data.user.lastName
        ? data.user.lastName
        : data.user.guardianLastName;

      localStorage.setItem('userToken', data.token);
      localStorage.setItem('username', data.user.firstName);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      this.setState({
        // email,
        userToken: data.token,
        user: data.user,
        // //UI
        registrationEvent: false,
        redirectToCatalog: false,
        showLogin: false,
      });
      console.log('logging in from page: ', this.props.history.location);
      if (this.props.history.location === 'guardian-registration') {
        this.props.history.push('/catalog');
      }
    } catch (err) {
      console.log({ ...err });
      console.log(err.response);
      if (err.response && err.response.status === 401) {
        this.setState({
          alertVisible: true,
          alertMessage: 'The email or password is incorrect',
        });
        return;
      } else {
        this.setState({
          alertVisible: true,
          alertMessage: 'Login unsuccessful',
        });
      }
    }
  };

  purchase = async (courses) => {
    const checkout = await axios.post(`${URI_STUB}/shop`, {
      customer: this.state.user.customerId,
      lineItems: courses,
    });

    // make Stripe object available from Window (see App.js)
    const stripe = this.props.stripe;
    try {
      await stripe.redirectToCheckout({
        sessionId: checkout.data.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  addGuardianToArrayOfProgramWaitlists = async (courseIds, userId) => {
    const config = setAuthHeader(this.state.userToken);

    // make program id array
    const programIds = courseIds.map((course) => course.id);

    // update user's waitlist
    const { data } = await axios.get(
      `${URI_STUB}/api/guardians/${userId}`,
      config
    );

    const updatedWaitlist = data.onWaitlists.concat(programIds);

    const { data: user } = await axios.put(
      `${URI_STUB}/api/guardians/${userId}`,
      {
        onWaitlists: updatedWaitlist,
      },
      config
    );

    // add userId to programs waitlists
    // get programs
    const getProgramsAsync = courseIds.map(
      async (course) =>
        await axios.get(`${URI_STUB}/api/programs/${course.id}`, config)
    );

    const getProgramsResolve = await Promise.all(getProgramsAsync);

    // add userId to program waitlist
    const updatedPrograms = getProgramsResolve.map(({ data }) => {
      const dateBegin = formatMongoDate(data.dateBegin);
      const dateEnd = formatMongoDate(data.dateEnd);
      return {
        ...data,
        dateBegin,
        dateEnd,
        waitlistedGuardians: [...data.waitlistedGuardians, userId],
      };
    });

    // create array of updated program ids
    const updatedProgramIdArr = updatedPrograms.map((program) => program.id);

    // update programs in state
    const updatedStatePrograms = this.state.programs.map((program) => {
      if (updatedProgramIdArr.includes(program.id)) {
        return updatedPrograms.find(
          (updatedProgram) => updatedProgram.id === program.id
        );
      } else {
        return program;
      }
    });
    // update state

    this.setState({ user, programs: updatedStatePrograms });

    // post to admin messages
    updatedProgramIdArr.map(async (program) => {
      const date = makeTimestampString();
      await axios.post(`${URI_STUB}/api/admin-messages/`, {
        type: 'waitlist',
        body: `${user.guardianFirstName} was added to  ${program.title} waitlist`,
        date,
      });
    });
  };

  // update guardian waitlist in state and
  addGuardianToProgramWaitlist = async (courseId, userId) => {
    // used by guardian to add their id to course waitlist
    // also add course id to guardian waitlist to notify user on catalog page that they've been added to the waitlist
    // get program
    const config = setAuthHeader(this.state.userToken);

    const program = await axios.get(
      `${URI_STUB}/api/programs/${courseId}`,
      config
    );
    // get user
    const user = await axios.get(`${URI_STUB}/api/guardians/${userId}`);

    const updatedProgram = await axios.put(
      `${URI_STUB}/api/programs/${courseId}`,
      {
        waitlistedGuardians: program.data.waitlistedGuardians.concat(
          user.data.id
        ),
      },
      config
    );

    // format date
    updatedProgram.data.dateBegin = formatMongoDate(
      updatedProgram.data.dateBegin
    );
    updatedProgram.data.dateEnd = formatMongoDate(updatedProgram.data.dateEnd);

    // add program id to user waitlist
    const updatedUser = await axios.put(
      `${URI_STUB}/api/guardians/${user.data.id}`,
      {
        onWaitlists: user.data.onWaitlists.concat(program.data.id),
      },
      config
    );

    const updatedPrograms = this.state.programs.map((program) => {
      return program.id === updatedProgram.data.id
        ? updatedProgram.data
        : program;
    });

    this.setState({
      ...this.state,
      programs: updatedPrograms,
      user: updatedUser.data,
    });

    const date = makeTimestampString();

    await axios.post(`${URI_STUB}/api/admin-messages/`, {
      type: 'waitlist',
      body: `${updatedUser.data.guardianFirstName} ${updatedUser.data.guardianLastName} was added to  ${program.data.title} waitlist`,
      date,
    });
  };

  register = async (guardianData) => {
    guardianData.guardianEmail = guardianData.guardianEmail.toLowerCase();

    const { data } = await axios.post(
      `${URI_STUB}/api/guardians`,
      guardianData
    );

    const date = makeTimestampString();

    await axios.post(`${URI_STUB}/api/admin-messages`, {
      type: 'registration',
      body: `A new guardian, ${data.guardianFirstName} ${data.guardianLastName}, has registered`,
      date,
    });

    if (data.error) {
      // display error message on admin page
      this.setState({ errorMessage: data.message });
      setTimeout(this.setState({ errorMessage: null }), 3000);

      return;
    }

    this.setState({ registrationEvent: true });
    return;
  };

  fullCourseDialogClose = () => {
    this.setState({
      fullCourseDialogVisible: false,
      fullCourseDialogMessage: '',
    });
  };

  addStudent = async (studentData) => {
    // create new student
    await axios.post(`${URI_STUB}/api/programs`, studentData);
    // PUT guardian/id
  };

  // run Stripe Checkout
  checkout = async (lineItems) => {
    this.purchase(lineItems);
  };

  clearFullCourseIds = () => {
    this.setState({ fullCourseIds: [] });
  };

  addProgram = async (program) => {
    const config = setAuthHeader(this.state.userToken);

    const result = await axios.post(
      `${URI_STUB}/api/programs`,
      program,
      config
    );

    const dateBegin = this.formatMongoDate(result.data.dateBegin, 'date');
    const dateEnd = this.formatMongoDate(result.data.dateEnd, 'date');

    message.success('Program added');
    this.setState((prevState) => ({
      programs: prevState.programs.concat({
        ...result.data,
        dateBegin,
        dateEnd,
      }),
    }));
  };

  updateProgram = async (programId, programData) => {
    const config = setAuthHeader(this.state.userToken);
    const result = await axios.put(
      `${URI_STUB}/api/programs/${programId}`,
      programData,
      config
    );

    console.log(result);
    // result.data will contain updated program

    if (result.status >= 200 && result.status <= 299)
      message.success('Program updated');
    // format dates and time
    const dateBegin = this.formatMongoDate(result.data.dateBegin, 'date');
    const dateEnd = this.formatMongoDate(result.data.dateEnd, 'date');
    const meetingTime = result.data.meetingTime;
    console.log(meetingTime);
    const updatedPrograms = this.state.programs.map((el) =>
      el.id === programId
        ? { ...result.data, dateBegin, dateEnd, meetingTime }
        : el
    );
    this.setState({ programs: updatedPrograms });
  };

  remove = async (id, type) => {
    const config = setAuthHeader(this.state.userToken);
    const result = await axios.delete(`${URI_STUB}/api/${type}/${id}`, config);

    if (result.status === 200) {
      const filtered = this.state[`${type}`].filter((el) => el.id !== id);
      this.setState({ [type]: filtered });
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
    const config = setAuthHeader(this.state.userToken);

    const updatedStatus = status === 'active' ? 'archive' : 'active';

    axios
      .put(
        `${URI_STUB}/api/${type}/${recordId}`,
        {
          status: updatedStatus,
        },
        config
      )
      .then(({ data }) => {
        console.log(data);
        if (type === 'programs') {
          const dateBegin = formatMongoDate(data.dateBegin);
          const dateEnd = formatMongoDate(data.dateEnd);
          data = { ...data, dateBegin, dateEnd };
        }
        const filterState = this.state[type].filter(
          (record) => record.id !== recordId
        );

        this.setState({ [type]: filterState.concat(data) });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = async () => {
    // load programs
    try {
      const results = await axios.get(`${URI_STUB}/api/programs`);
      // map formatted dates onto program
      const programs = results.data.map((program) => {
        const dateBegin = formatMongoDate(program.dateBegin);
        const dateEnd = formatMongoDate(program.dateEnd);
        return { ...program, dateBegin, dateEnd };
      });
      this.setState({ programs });
    } catch (err) {
      console.log(
        'there was an error retrieving programs while mounting Root',
        err
      );
    }

    const userToken = localStorage.getItem('userToken');
    const username = localStorage.getItem('username');

    this.setState({ userToken, username });
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
          user={this.state.user}
          logout={this.logout}
        />
        <Switch>
          {/* {this.state.redirectToCatalog ? (
            <Redirect from="/guardian-registration" to="/catalog" />
          ) : null} */}
          <Route
            exact
            path="/"
            render={(routeProps) => (
              <Home {...routeProps} login={this.login} user={this.state.user} />
            )}
          />
          <Route
            exact
            path="/catalog"
            render={(routeProps) => (
              <Catalog
                {...routeProps}
                addGuardianToWaitlist={this.addGuardianToProgramWaitlist}
                addGuardianToArrayOfProgramWaitlists={
                  this.addGuardianToArrayOfProgramWaitlists
                }
                login={this.login}
                stripe={this.props.stripe}
                programs={this.state.programs}
                userToken={this.state.userToken}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/about"
            render={(routeProps) => (
              <About
                {...routeProps}
                login={this.login}
                user={this.state.user}
                getTokenFromLocalStorage={this.getTokenFromLocalStorage}
              />
            )}
          />
          <Route
            exact
            path="/success"
            render={(routeProps) => (
              <Success
                {...routeProps}
                login={this.login}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/cancel"
            render={(routeProps) => (
              <Cancel
                {...routeProps}
                login={this.login}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/guardian-registration"
            render={(routeProps) => (
              <GuardianRegistration
                {...routeProps}
                register={this.register}
                login={this.login}
                user={this.state.user}
                registrationEvent={this.state.registrationEvent}
                errorMessage={this.state.errorMessage}
              />
            )}
          />
          <Route
            exact
            path="/admin"
            render={(routeProps) => (
              <Admin
                {...routeProps}
                addGuardian={this.register}
                addProgram={this.addProgram}
                toggleStatus={this.toggleStatus}
                remove={this.remove}
                login={this.login}
                guardians={this.state.guardians}
                programs={this.state.programs}
                students={this.state.students}
                admins={this.state.admins}
                user={this.state.user}
                userToken={this.state.userToken}
                updateProgram={this.updateProgram}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const stripeWrapper = injectStripe(withRouter(Root));
export default stripeWrapper;
