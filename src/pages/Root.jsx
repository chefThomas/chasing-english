import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import SideNav from "../components/SideNav";
import Home from "./Home";
import Register from "./Register";
import About from "./About";
import Admin from "./Admin";

import "../stylesheets/css/main.css";

export default class Root extends Component {
  state = {
    showSignup: false,
    showLogin: false,
    showSideNav: false,
    sessions: []
  };

  toggleSignup = () => {
    this.setState({
      showSignup: !this.state.showSignup,
      showLogin: false,
      showSideNav: false
    });
  };

  toggleLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin,
      showSignup: false,
      showSideNav: false
    });
  };

  toggleSideNav = () => {
    this.setState({
      showSideNav: !this.state.showSideNav,
      showSignup: false,
      showLogin: false
    });
  };

  closeSideNav = () => {
    this.setState({
      showSideNav: false
    });
  };

  addSession = session => {
    axios.post("http://localhost:3001/programs", session).then(res => {
      this.setState(st => ({ sessions: st.sessions.concat(res.data) }));
    });
  };

  removeSession = sessionId => {
    axios.delete(`http://localhost:3001/programs/${sessionId}`).then(res => {
      const filteredSessions = this.state.sessions.filter(
        session => session.id !== sessionId
      );
      this.setState({ sessions: filteredSessions });
    });
  };

  componentDidMount() {
    axios.get("http://localhost:3001/programs").then(res => {
      this.setState(st => ({
        sessions: st.sessions.concat(res.data)
      }));
    });
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
          className={this.state.showSignup ? "SignupForm" : "offscreen"}
        />
        <LoginForm
          toggle={this.toggleLogin}
          toggleSignup={this.toggleSignup}
          className={this.state.showLogin ? "LoginForm" : "offscreen-login"}
        />
        <SideNav
          closeSideNav={this.closeSideNav}
          className={this.state.showSideNav ? "SideNav" : "offscreen-sidenav"}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => <Home {...this.state} {...routeProps} />}
          />
          <Route
            exact
            path="/register"
            render={routeProps => (
              <Register {...routeProps} sessions={this.state.sessions} />
            )}
          />
          <Route
            exact
            path="/about"
            render={routeProps => <About {...routeProps} />}
          />
          <Route
            exact
            path="/admin"
            render={routeProps => (
              <Admin
                {...routeProps}
                addSession={this.addSession}
                sessions={this.state.sessions}
                removeSession={this.removeSession}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
