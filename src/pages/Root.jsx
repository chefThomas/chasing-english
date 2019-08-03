import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";
import Home from "./Home";
import Book from "./Book";
import About from "./About";

import "../stylesheets/css/main.css";

export default class Root extends Component {
  state = {
    showSignup: false,
    showLogin: false
  };

  toggleSignup = () => {
    this.setState({ showSignup: !this.state.showSignup });
  };
  render() {
    // const {showSignup} = this.props.showSignUp;
    // const {showlogin} = this.props.showLogin;

    return (
      <div className="Root">
        <Navbar {...this.state} toggleForm={this.toggleSignup} />
        <SignupForm
          toggle={this.props.showSignup}
          className={this.state.showSignup ? "SignupForm" : "offscreen"}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => (
              <Home
                {...this.state}
                {...routeProps}
                toggleForm={this.toggleSignup}
              />
            )}
          />
          <Route
            exact
            path="/schedule"
            render={routeProps => <Book {...routeProps} />}
          />
          <Route
            exact
            path="/about"
            render={routeProps => <About {...routeProps} />}
          />
        </Switch>
      </div>
    );
  }
}
