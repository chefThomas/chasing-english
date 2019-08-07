import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import Home from "./Home";
import Book from "./Book";
import About from "./About";
import Admin from "./Admin";

import "../stylesheets/css/main.css";

export default class Root extends Component {
  state = {
    showSignup: false,
    showLogin: false,
    sessions: []
  };

  toggleSignup = () => {
    this.setState({ showSignup: !this.state.showSignup, showLogin: false });
  };

  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin, showSignup: false });
  };

  addSession = session => {
    console.log("in addsession", session);
    this.setState(st => ({
      sessions: [...st.sessions, session]
    }));
  };
  render() {
    return (
      <div className="Root">
        <Navbar
          {...this.state}
          toggleSignup={this.toggleSignup}
          toggleLogin={this.toggleLogin}
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
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => <Home {...this.state} {...routeProps} />}
          />
          <Route
            exact
            path="/schedule"
            render={routeProps => (
              <Book {...routeProps} sessions={this.state.sessions} />
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
              <Admin {...routeProps} addSession={this.addSession} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
